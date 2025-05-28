import { useEffect, useState } from "react";
import "./Posts.scss";
import { getPostsService } from "../service/ApiService";
import { useSelector } from "react-redux";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const userId = useSelector((state) => state.user.account);
  useEffect(() => {
    const fecthPosts = async () => {
      try {
        const res = await getPostsService(userId.id);
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
                <img src={post.author.avatar} alt="" />
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
                {post.media.map((m, idx) => {
                  if (m?.type?.startsWith("image/")) {
                    return <img key={idx} src={m.data} alt={`media-${idx}`} />;
                  } else if (m?.type?.startsWith("video/")) {
                    return (
                      <video key={idx} controls>
                        <source src={m.data} type={m.type} />
                      </video>
                    );
                  } else {
                    return null;
                  }
                })}
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
