import actiontypes from "../Action/ActionTypes";

const INITIAL_STATE = {
  account: {
    email: "",
    avatar: "",
    roleId: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    id: "",
    accessToken: "",
    refreshToken: "",
  },
  isauthentic: false,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case actiontypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          accessToken: action?.data?.payloadToken?.accessToken,
          refreshToken: action?.data?.payloadToken?.refreshToken,
          email: action?.data?.data?.email,
          avatar: action?.data?.data?.avatar,
          roleId: action?.data?.data?.roleId,
          firstName: action?.data?.data?.firstName,
          lastName: action?.data?.data?.lastName,
          gender: action?.data?.data?.gender,
          phoneNumber: action?.data?.data?.phoneNumber,
          id: action?.data?.data?._id,
        },

        isauthentic: true,
      };

    case actiontypes.USER_LOGIN_FAIL:
      return {
        ...state,
        account: null,
        isauthentic: false,
      };
    case actiontypes.USER_LOGOUT:
      return {
        ...state,
        account: null,
        isauthentic: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
