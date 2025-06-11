import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSocket } from "../../socket";
import { Button, Modal } from "react-bootstrap";
import "./NotificationModal.scss";
import { getNotifications } from "../../service/ApiService";
import { toast } from "react-toastify";
import avt from "../../assets/image/avatar-female.avif";
const NotificationArea = (props) => {
  const { openNotifications, setOpenNotifications, user } = props;
  const userId = useSelector((state) => state.user.account?.id);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user?.id && openNotifications === true) {
      fecthAllNotifications(user.id);
    }
  }, [user, openNotifications]);
  const fecthAllNotifications = async (userId) => {
    let response = await getNotifications(userId);
    if (response?.Ec === 0) {
      setNotifications(response.data);
    } else {
      toast.error(response.Mes);
    }
  };
  useEffect(() => {
    if (!userId) return;
    const socket = createSocket(userId);
    socket.on("new-notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("new-notification");
      socket.disconnect();
    };
  }, [userId]);
  console.log("notifications", notifications);
  return (
    <>
      <Modal
        show={openNotifications}
        onHide={() => setOpenNotifications(!openNotifications)}
        // backdrop="static"
        size="md"
        keyboard={false}
        className="modal-container"
      >
        <Modal.Header className="header-modal">
          <div className="col">
            <Modal.Title>
              <div className="header-title">Notification</div>
            </Modal.Title>
            <Modal.Title>
              <div className="header-content">
                <span className="header-child">All</span>
                <span className="header-child">haven't read yet</span>
              </div>
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          {notifications &&
            notifications.length > 0 &&
            notifications.map((item, index) => {
              return (
                <div className="content-modal">
                  <div className="image-user">
                    <img src={item.senderId.avatar} />
                  </div>
                  <div className="content-noti">
                    <span className="notifi-main">
                      {item.senderId.firstName} vừa gửi cho bạn lời mời kết bạn
                    </span>
                    <span className="notifi-time">2h ago</span>
                    {item.type === "friend_request" && (
                      <div className="btn-action">
                        <button className="btn btn-primary">Confirm</button>
                        <button className="btn btn-secondary">Cancel</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <span>Xem thoong bao trc do</span>
        </Modal.Footer>
      </Modal>
    </>
    // <div>
    //   <h3>Thông báo mới:</h3>
    //   <ul>
    //     {notifications.map((n, i) => (
    //       <li key={n._id}>{n.content || "Thông báo mới!"}</li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default NotificationArea;
