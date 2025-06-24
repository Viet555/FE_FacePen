import { useSelector } from "react-redux";
import "./Suggested.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFriendSuggestion, SendFriendRequest } from "../service/ApiService";

const Suggested = () => {
  const user = useSelector((state) => state.user.account);
  const userId = user?.id;
  const [friends, setFriends] = useState();
  useEffect(() => {
    FriendSuggestion();
  }, [user]);
  const FriendSuggestion = async () => {
    if (user) {
      let res = await getFriendSuggestion(user?.id);
      if (res?.Ec === 0) {
        setFriends(res.data);
      } else {
        toast.error(res?.Mes);
      }
    }
  };
  console.log(friends);
  //friendRequest
  const friendRequest = async (recipient) => {
    if (!userId || !recipient._id) {
      return toast.error("an error occurred");
    }
    let res = await SendFriendRequest(userId, recipient._id);
    if (res?.Ec === 0) {
      toast.success(res.Mes);
      // FriendSuggestion();
    } else {
      toast.error(res?.Mes);
    }
  };
  return (
    <div className="suggested-list">
      <div className="suggested-title">
        <div className="title-header">
          <p>Suggested for you</p>
        </div>
        <div className="show-all-btn">
          <p>See All</p>
        </div>
      </div>
      {friends &&
        friends.sameCitySuggestions &&
        friends.sameCitySuggestions.length > 0 &&
        friends.sameCitySuggestions.map((item) => {
          let fullName = item.firstName + item.lastName;
          return (
            <div className="suggested-option" key={`Suggested${item._id}`}>
              <div className="user-info">
                <img src={item.avatar} />
                <div className="user-name">{fullName}</div>
              </div>
              <div className="btn-follow" onClick={() => friendRequest(item)}>
                {item.status === "pending" ? "request sent" : "follow"}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Suggested;
