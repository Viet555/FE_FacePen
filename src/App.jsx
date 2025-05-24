import AppRoute from "./routes/AppRoute";
import "./App.css";
import { ToastContainer } from "react-toastify";
function App() {
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
