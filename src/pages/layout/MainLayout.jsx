import SideBar from "../../components/SideBar"

const MainLayout = ({children}) => {
    return (
        <div className="container">
            <SideBar />
            <div className="content-page">
                {children}
            </div>
        </div>
    )
}

export default MainLayout 