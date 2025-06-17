import { Modal } from "react-bootstrap";
import "./ShareModal.scss";

const Share = ({ show, handleClose, post }) => {
  return (
    <Modal show={show} onHide={handleClose} className="share-modal" centered>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Chia sẻ</div>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>

        <div className="modal-body">
          <div className="user-info">
            <img src={post?.author?.avatar || "/default-avatar.png"} alt="avatar" />
            <div className="user-meta">
              <div className="name">
                {post?.author?.firstName} {post?.author?.lastName}
              </div>
              <div className="privacy">
                <button className="privacy-btn">
                  <i className="fa-solid fa-lock"></i> Chỉ mình tôi <i className="fa-solid fa-caret-down"></i>
                </button>
              </div>
            </div>
          </div>

          <textarea
            className="share-textarea"
            placeholder="Hãy nói gì đó về nội dung này..."
          ></textarea>

          <button className="btn-share">Chia sẻ ngay</button>

          <div className="share-section">
            <div className="section-title">Gửi bằng Messenger</div>
            <div className="messenger-users">
              {["Di Động Sài Gòn", "Nguyễn Hoàng", "Táo Zin", "Di Động Việt", "Phước Lợi", "Vy Vy"].map(
                (name, idx) => (
                  <div className="user-item" key={idx}>
                    <div className="avatar" />
                    <div className="name">{name}</div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="share-section">
            <div className="section-title">Chia sẻ lên</div>
            <div className="platform-icons">
              <i className="fa-brands fa-facebook-messenger"></i>
              <i className="fa-brands fa-whatsapp"></i>
              <i className="fa-solid fa-book-open"></i>
              <i className="fa-solid fa-link"></i>
              <i className="fa-solid fa-user-group"></i>
              <i className="fa-solid fa-flag"></i>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Share;
