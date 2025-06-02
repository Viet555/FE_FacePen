import MainLayout from "./layout/MainLayout";
import Posts from "../components/Posts";
import Story from "../components/Story";
import Suggested from "../components/Suggested";
import "./HomePage.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();
  const isAuthen = useSelector((state) => state.user.isauthentic);
  useEffect(() => {
    if (isAuthen === false) {
      navigate("/login");
    }
  }, [isAuthen]);
  return (
    <MainLayout>
      <div className="main-content">
        <div className="content">
          <div className="list-story">
            <Story />
          </div>
          <div className="list-posts">
            <Posts />
          </div>
        </div>
        <div className="sub-content">
          <Suggested />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
