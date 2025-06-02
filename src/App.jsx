import AppRoute from "./routes/AppRoute";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!account?.gender) {
  //     navigate("/chooseGender");
  //   }
  // }, [account, navigate]);

  return (
    <>
      <AppRoute />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
