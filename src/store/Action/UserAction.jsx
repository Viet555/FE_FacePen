import { toast } from "react-toastify";
import { handleLogin } from "../../service/ApiService";
import actiontypes from "./ActionTypes";

export const UserLoginRedux = (dataLog) => {
  return async (dispatch, getState) => {
    let dataUser = await handleLogin(dataLog);
    console.log(dataUser);
    try {
      if (dataUser?.EC === 0) {
        dispatch({
          type: actiontypes.USER_LOGIN_SUCCESS,
          data: dataUser,
        });
      } else {
        toast.error(dataUser?.Mes);
        dispatch({
          type: actiontypes.USER_LOGIN_FAIL,
        });
      }
    } catch (e) {
      console.log("err", e);
      dispatch({
        type: actiontypes.USER_LOGIN_FAIL,
      });
    }
  };
};
export const userLogout = () => ({
  type: actiontypes.USER_LOGOUT,
});
