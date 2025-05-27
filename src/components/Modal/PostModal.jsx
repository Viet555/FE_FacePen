import './PostModal.scss'

const PostModal = ({onClose}) => {
    return (
        <div className="post-modal-overlay">
            <div className="post-modal">
                <div className="modal-header">
                    <h3>Create New Post</h3>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="user-info">
                        <div className="avatar-placeholder"></div>
                        <div>
                            <p className="username"></p>
                            <button className="privacy"></button>
                        </div>
                    </div>
                    <textarea  placeholder="What do you think?" rows={4}></textarea>

                    <div className="upload-section">
                        <div className="upload-box">
                            <span>Add photo/video <small>or drag and drop</small></span>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="post-btn" disabled>Post</button>
                </div>
            </div>
        </div>
    )
}

export default PostModal
