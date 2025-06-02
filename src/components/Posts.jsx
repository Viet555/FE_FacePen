import { useEffect, useState } from "react";
import "./Posts.scss";
import { getPostsService } from "../service/ApiService";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const Posts = () => {
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
  useEffect(() => {
    const fecthPosts = async () => {
      try {
        const res = await getPostsService(userId.id);
        console.log(res.Data);
        if (res?.Ec === 0) {
          setPosts(res.Data);
        } else {
          console.log(res?.Mes);
        }
      } catch (error) {
        console.log("Error fetching posts: ", error);
      }
    };
    fecthPosts();
  }, [userId]);

  return (
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
              <div className="btn-more">
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            <div className="post-box__content">
              <div className="caption-post">{post.caption}</div>
              <div className="media-post">
                <Slider {...settingSlide}>
                  {post?.media?.map((m, idx) => {
                    if (m?.type?.startsWith("image/")) {
                      console.log("testestestet", m.url);
                      return <img key={idx} src={m.url} alt={`media-${idx}`} />;
                    } else if (m?.type?.startsWith("video/")) {
                      return (
                        <video key={idx} controls>
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
            <div className="post-box__action">
              <div className="reaction-post">
                <i className="fa-regular fa-heart"></i>
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
  );
};

export default Posts;
