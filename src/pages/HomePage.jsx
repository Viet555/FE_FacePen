import MainLayout from "./layout/MainLayout"
import Posts from "../components/Posts"
import Story from "../components/Story"
import Suggested from "../components/Suggested"
import "./HomePage.scss"    

const HomePage = () => {
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
    )
}

export default HomePage