import { useEffect, useRef, useState } from "react";
import "./Posts.scss";
import { getPostsService, likePost } from "../service/ApiService";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { toast } from "react-toastify";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";

const Posts = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState([]);

  const [showMenu, setShowMenu] = useState(false);
  const moreMenuRef = useRef(null);
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  const handleMediaClick = (mediaList, currentIndex) => {
    const slides = mediaList.map((m) => {
      if (m?.type?.startsWith("image/")) {
        return { type: "image", src: m.url };
      } else if (m?.type?.startsWith("video/")) {
        return {
          type: "video",
          width: 1280,
          height: 720,
          poster: m.url,
          sources: [{ src: m.url, type: m.type }],
        };
      }
    });

    setLightboxSlides(slides);
    setLightboxIndex(currentIndex);
    setLightboxOpen(true);
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, zIndex: 2 }}
        onClick={onClick}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, zIndex: 2 }}
        onClick={onClick}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    );
  };

  const settingSlide = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const [posts, setPosts] = useState([]);
  const userId = useSelector((state) => state.user.account);
  const [likeStatus, setLikeStatus] = useState({});

  useEffect(() => {
    fecthPosts();
  }, [userId]);
  const fecthPosts = async () => {
    try {
      if (userId) {
        const res = await getPostsService(userId.id);
        if (res?.Ec === 0) {
          setPosts(res.Data);
          syncLikeStatus(res.Data);
        } else {
          toast.error(res?.Mes);
        }
      }
    } catch (error) {
      console.log("Error fetching posts: ", error);
    }
  };
  const syncLikeStatus = (posts) => {
    const status = {};
    posts.forEach((post) => {
      status[post._id] = post.likes.some((like) => {
        if (typeof like === "string") return like === userId.id;
        if (typeof like === "object" && like._id) return like._id === userId.id;
        return false;
      });
    });
    setLikeStatus(status);
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await likePost(postId, userId?.id);
      if (response?.Ec === 0) {
        setLikeStatus((prev) => ({
          ...prev,
          [postId]: !prev[postId],
        }));

        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              const alreadyLiked = post.likes.some((like) => {
                if (typeof like === "string") return like === userId.id;
                if (typeof like === "object" && like._id)
                  return like._id === userId.id;
                return false;
              });
              const updatedLikes = alreadyLiked
                ? post.likes.filter((like) => {
                    if (typeof like === "string") return like !== userId.id;
                    if (typeof like === "object" && like._id)
                      return like._id !== userId.id;
                    return true;
                  })
                : [...post.likes, userId.id];
              return { ...post, likes: updatedLikes };
            }
            return post;
          })
        );
      } else {
        toast.error(response?.Mes);
      }
    } catch (error) {
      console.error("Lỗi like:", error);
    }
  };

  return (
    <>
      <div className="posts-content">
        {posts &&
          posts.length > 0 &&
          posts.map((post, index) => (
            <div className="post-box" key={post._id}>
              <div className="post-box__header">
                <div className="avt-user">
                  <img src={post.author.avatar || null} />
                  <div className="user-name">
                    {post.author.firstName} {post.author.lastName}
                  </div>
                </div>
                <div
                  className="btn-more"
                  onClick={toggleMenu}
                  ref={moreMenuRef}
                >
                  <i className="fa-solid fa-ellipsis"></i>
                  <div
                    className="btn-more__menu"
                    style={{ display: showMenu ? "block" : "none" }}
                  >
                    <ul className="menu">
                      <li className="option" style={{ color: "red" }}>
                        Report
                      </li>
                      <li className="option">Don't Care</li>
                      <li className="option">Save</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="post-box__content">
                <div className="caption-post">{post.caption}</div>
                <div className="media-post">
                  <Slider {...settingSlide}>
                    {post?.media?.map((m, idx) => {
                      if (m?.type?.startsWith("image/")) {
                        return (
                          <img
                            key={idx}
                            src={m.url}
                            alt={`media-${idx}`}
                            onClick={() => handleMediaClick(post.media, idx)}
                          />
                        );
                      } else if (m?.type?.startsWith("video/")) {
                        return (
                          <video
                            key={idx}
                            controls
                            onClick={() => handleMediaClick(post.media, idx)}
                          >
                            <source src={m.url} type={m.type} />
                          </video>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Slider>
                </div>
              </div>
              <div className="likepost-show">
                {likeStatus[post._id]
                  ? post.likes.length === 1
                    ? "You "
                    : `You and ${post.likes.length - 1} others `
                  : `${post.likes.length} `}
                <i className="fa-solid fa-heart"></i>
                <div className="likepost-total">
                  {post?.likes?.length > 0 &&
                    post.likes.map((item) => {
                      const firstName = item?.firstName || "";
                      const lastName = item?.lastName || "";
                      const userName = `${firstName}${lastName}`.trim();
                      return <div key={item._id}>{userName}</div>;
                    })}
                </div>
              </div>
              <div className="post-box__action">
                <div className="reaction-post">
                  <i
                    style={{ color: likeStatus[post._id] ? "red" : "black" }}
                    className="fa-solid fa-heart"
                    onClick={() => handleLikePost(post._id)}
                  ></i>
                </div>
                <div className="comment-post">
                  <i className="fa-regular fa-comment"></i>
                </div>
                <div className="share-post">
                  <i className="fa-solid fa-share"></i>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        plugins={[Video]}
      />
    </>
  );
};

export default Posts;
