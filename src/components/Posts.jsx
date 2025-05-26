import { useEffect, useState } from 'react'
import './Posts.scss'
import { getPostsService } from '../service/ApiService'
import { useSelector } from 'react-redux'
const Posts = () => {
    const [ posts, setPosts ] = useState([])
    const userId = useSelector(state => state.user.account)
    console.log(userId.id)
    useEffect(() => {
        const fecthPosts = async () => {
            try {
                const res = await getPostsService(userId.id) 
                if (res?.data?.Ec === 0) {
                    setPosts(res.data.Data)
                } else {
                    console.error(res?.data?.Mes)
                }
            } catch (error) {
                console.error("Error fetching posts: ", error)
            }
        }
        fecthPosts()
    }, [])

    return (
        <div className="posts-content">
            {posts.map((post, index) => (
                <div className="post-box" key={index}>
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
                    <div className="caption-post">
                        {post.caption}
                    </div>
                    <div className="media-post">
                        {post.media.map((m) => (
                            <img src={m} className='media-item'></img>
                        ))}
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
    )
}

export default Posts