import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSocket } from "../../socket";
import { Button, Modal } from "react-bootstrap";
import "./PostModal.scss";
import { getNotifications } from "../../service/ApiService";
import { toast } from "react-toastify";
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

  return (
    <>
      <Modal
        show={openNotifications}
        onHide={() => setOpenNotifications(!openNotifications)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setOpenNotifications(!openNotifications)}
          >
            Close
          </Button>
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
