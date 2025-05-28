import { useSelector } from "react-redux";
import "./Suggested.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFriendSuggestion } from "../service/ApiService";

const Suggested = () => {
  const user = useSelector((state) => state.user.account);
  const [friends, setFriends] = useState();
  useEffect(() => {
    FriendSuggestion();
  }, [user]);
  const FriendSuggestion = async () => {
    let res = await getFriendSuggestion(user?.id);
    if (res?.Ec === 0) {
      setFriends(res.data);
    } else {
      toast.error(res?.Mes);
    }
  };
  console.log("ecqecq", friends?.sameCitySuggestions);
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
                <img src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=cp0_dst-png_s40x40&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeFQFnnwgzlIPb6Gb-a2EF6jWt9TLzuBU1Ba31MvO4FTUDB-45y5YRAYO2ixbEM2IWbe20-zxzeZlHg51CmARllL&_nc_ohc=VKVnUwzUX7gQ7kNvwHnhsn-&_nc_oc=AdkK7C3AayeB-iE_knWy3onbB-OGpDvimZ78eK4Y0bJ107VuEknjCESmnbqKGdzKXDw&_nc_zt=24&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfLw0kX5uEdwDV1DItUDEIaXX5B1NGAXthkhldHHLLWWXQ&oe=6857C4BA" />
                <div className="user-name">{fullName}</div>
              </div>
              <div className="btn-follow">Follow</div>
            </div>
          );
        })}
    </div>
  );
};

export default Suggested;
