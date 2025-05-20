import logoImage from '../../assets/image/Logo.jpeg'
import './AuthLayout.scss'

const AuthLayout = ({children}) => {
    return (
        <div className="login-container">
            <div className="login__content-left">
                <div className="logo-site">
                    <img src={logoImage} className="logo" />
                </div>
            </div>
            <div className="login__content-right">
                {children}
            </div>
            <div className="custom-shape-divider-bottom-1747551527">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    )
}

export default AuthLayout