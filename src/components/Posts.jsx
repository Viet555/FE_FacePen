import { useState } from 'react'
import './Posts.scss'
// import { getPostsService } from '../service/ApiService'
import postImg  from '../assets/image/post-image.jpg'
const Posts = () => {
    // const [posts, setPosts] = useState([])
    // const [loading, setLoading] = useState(true)

    return (
        <div className="posts-content">
            <div className="post-box">
                <div className="post-box__header">
                    <div className="avt-user">
                        <i className="fa-regular fa-circle-user"></i>
                        <div className="user-name">
                            Nguyen Van Tu Vinh
                        </div>
                    </div>
                    <div className="btn-more">
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                <div className="post-box__content">
                    <div className="caption-post">
                        Ai muốn thử cảm giác lên mây thì nhất định phải đi Đà Lạt mùa này nha 😗 
                    </div>
                    <div className="media-post">
                        <img src={postImg} />
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
            <div className="post-box">
                <div className="post-box__header">
                    <div className="avt-user">
                        <i className="fa-regular fa-circle-user"></i>
                        <div className="user-name">
                            Nguyen Van Tu Vinh
                        </div>
                    </div>
                    <div className="btn-more">
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                <div className="post-box__content">
                    <div className="caption-post">
                        Ai muốn thử cảm giác lên mây thì nhất định phải đi Đà Lạt mùa này nha 😗 
                    </div>
                    <div className="media-post">
                        <img src={postImg} />
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
        </div>
    )
}

export default Posts