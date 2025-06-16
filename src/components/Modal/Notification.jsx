import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSocket } from "../../socket";
import { Button, Modal } from "react-bootstrap";
import "./NotificationModal.scss";
import {
  friendAccept,
  friendReject,
  getNotifications,
  markAsReadNotifi,
} from "../../service/ApiService";
import { toast } from "react-toastify";
import avt from "../../assets/image/avatar-female.avif";
const NotificationArea = (props) => {
  const { openNotifications, setOpenNotifications, user } = props;
  const userId = useSelector((state) => state.user.account?.id);
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("");
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
  const handleConfirmRequest = async (requester) => {
    let requesterId = requester?.senderId?._id;
    let res = await friendAccept(requesterId, userId);
    if (res?.Ec === 0) {
      toast.success(res.Mes);
      let statusRel = res?.data?.status;
      setStatus(statusRel);
      setNotifications((prev) =>
        prev.map((noti) =>
          noti._id === requester._id
            ? {
                ...noti,
                relationShipId: {
                  ...noti.relationShipId,
                  status: "accepted",
                },
              }
            : noti
        )
      );
    } else {
      toast.error(res?.Mes);
    }
  };
  const handleCancelRequest = async (requester) => {
    let requesterId = requester?.senderId?._id;
    let res = await friendReject(requesterId, userId);
    if (res?.Ec === 0) {
      toast.success(res.Mes);
      let statusRel = res?.data?.status;
      setStatus(statusRel);
      setNotifications((prev) =>
        prev.map((noti) =>
          noti._id === requester._id
            ? {
                ...noti,
                relationShipId: {
                  ...noti.relationShipId,
                  status: "reject",
                },
              }
            : noti
        )
      );
    } else {
      toast.error(res?.Mes);
    }
  };
  const markAsRead = async (notiId) => {
    if (!notiId) {
      return toast.error("error notifi");
    }
    let res = await markAsReadNotifi(notiId);
    if (res?.Ec !== 0) {
      toast.error(res.Mes);
    } else {
      fecthAllNotifications(user.id);
    }
  };
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
          {notifications && notifications.length > 0 ? (
            notifications.map((item, index) => {
              const dataTime = item.updatedAt;
              const timeFull = dataTime.split("T")[1];
              const timeOnly = timeFull.split(".")[0];

              return (
                <div
                  className="content-modal"
                  style={
                    item.isRead === false
                      ? { color: "rgb(250, 250, 250)" }
                      : { color: "rgb(219, 213, 213)" }
                  }
                  onClick={() => markAsRead(item._id)}
                  key={`modal${item._id}`}
                >
                  <div className="image-user">
                    <img src={item.senderId.avatar || avt} />
                  </div>
                  <div className="content-noti">
                    <span className="notifi-main">
                      {item.senderId.firstName}
                      {(item.type === "friend_request" &&
                        " send you a friend request") ||
                        (item.type === "like" && " liked your post") ||
                        (item.type === "comment" && " comment your post") ||
                        (item.type === "friend_accept" &&
                          " friend request accepted")}
                    </span>
                    <span className="notifi-time">{timeOnly}</span>
                    {item.type === "friend_request" && (
                      <div className="btn-action">
                        {item.relationShipId.status === "pending" ? (
                          <>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleConfirmRequest(item)}
                            >
                              Confirm
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => handleCancelRequest(item)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : item.relationShipId.status === "accepted" ? (
                          <span className="text-success">Accept</span>
                        ) : (
                          <span className="text-danger">Reject</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <span>You have no notifications</span>
          )}
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
