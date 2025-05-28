import actiontypes from "../Action/ActionTypes";


const avt = "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=cp0_dst-png_s40x40&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeFQFnnwgzlIPb6Gb-a2EF6jWt9TLzuBU1Ba31MvO4FTUDB-45y5YRAYO2ixbEM2IWbe20-zxzeZlHg51CmARllL&_nc_ohc=VKVnUwzUX7gQ7kNvwHnhsn-&_nc_oc=AdkK7C3AayeB-iE_knWy3onbB-OGpDvimZ78eK4Y0bJ107VuEknjCESmnbqKGdzKXDw&_nc_zt=24&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfLw0kX5uEdwDV1DItUDEIaXX5B1NGAXthkhldHHLLWWXQ&oe=6857C4BA"

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
          avatar: action?.data?.data?.avatar || avt,
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
