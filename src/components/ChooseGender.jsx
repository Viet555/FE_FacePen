import "./ChooseGender.scss";
import avatarMale from "../assets/image/avatar-male.avif";
import avatarFeMale from "../assets/image/avatar-female.avif";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import actiontypes from "../store/Action/ActionTypes";

const ChooseGender = () => {
  const infoUser = useSelector((state) => state.user.account);
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChooseGender = async (gender) => {
    if (!gender) {
      return toast.error("missing gender");
    }
    let res = await updateUser(infoUser.id, gender);
    if (res?.Ec === 0) {
      toast.success("choose Gender success");
      dispatch({
        type: actiontypes.UPDATE_USER_INFO,
        payload: { gender },
      });
      navigate("/");
    } else {
      toast.error(res?.Mes);
    }
  };
  return (
    <>
      <div className="gender-container">
        <div className="gender-content">
          <div className="content__header">
            <div className="content__header--title">
              <h4 className="title">Choose your gender</h4>
            </div>
          </div>
          <div className="content__body">
            <div
              className="gender__option"
              onClick={() => handleChooseGender("male")}
            >
              <img src={avatarMale} alt="" className="gender-img" />
              <div className="gender-title">Male</div>
            </div>
            <div
              className="gender__option"
              onClick={() => handleChooseGender("Female")}
            >
              <img src={avatarFeMale} alt="" className="gender-img" />
              <div className="gender-title">FeMale</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChooseGender;
