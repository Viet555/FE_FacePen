import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import './CommentModal.scss'

const Comment = ({ show, handleClose, post }) => {
  if (!post) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="comment-modal" >
      <Modal.Header closeButton className="comment-modal__header">
        <Modal.Title>Bình luận bài viết</Modal.Title>
      </Modal.Header>

      <Modal.Body className="comment-modal__body">
        <div className="post-preview mb-3">
          <div className="d-flex align-items-center gap-2">
            <img src={post.author.avatar} alt="avatar" className="rounded-circle" width="40" height="40" />
            <strong>
              {post.author.firstName} {post.author.lastName}
            </strong>
          </div>
          <p className="mt-2">{post.caption}</p>
          {post?.media?.[0]?.type?.startsWith("image/") && (
            <img
              src={post.media[0].url}
              alt="media"
              className="img-fluid rounded"
            />
          )}
          {post?.media?.[0]?.type?.startsWith("video/") && (
            <video controls className="w-100 rounded mt-2">
              <source
                src={post.media[0].url}
                type={post.media[0].type}
              />
            </video>
          )}
        </div>

        <div className="comments-section">
          {post.comments?.length > 0 ? (
            post.comments.map((cmt, idx) => (
              <div className="comment-item mb-2" key={idx}>
                <strong>{cmt.user?.firstName} {cmt.user?.lastName}</strong>: {cmt.text}
              </div>
            ))
          ) : (
            <div className="text-muted">Chưa có bình luận nào</div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="comment-modal__footer">
        <input type="text" placeholder="Enter your comment..." className="form-control" />
      </Modal.Footer>
    </Modal>
  );
};

Comment.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  post: PropTypes.object,
};

export default Comment;
