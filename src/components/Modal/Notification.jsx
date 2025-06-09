import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSocket } from "../../socket";

const NotificationArea = () => {
  const userId = useSelector((state) => state.user.account?.id);
  const [notifications, setNotifications] = useState([]);

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
    <div>
      <h3>Thông báo mới:</h3>
      <ul>
        {notifications.map((n, i) => (
          <li key={n._id}>{n.content || "Thông báo mới!"}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationArea;
