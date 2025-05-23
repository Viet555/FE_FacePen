import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './FormRegister.scss';
import { handleRegister } from "../service/ApiService";

const FormRegister = () => {
    const navigate = useNavigate();

    const [formRegister, setFormRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [hiddenPassword, setHiddenPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { firstName: "", lastName: "", email: "", password: "" };

        if (!formRegister.firstName) {
            newErrors.firstName = "(*) First Name is required";
            isValid = false;
        }
        if (!formRegister.lastName) {
            newErrors.lastName = "(*) Last Name is required";
            isValid = false;
        }
        if (!formRegister.email) {
            newErrors.email = "(*) Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formRegister.email)) {
            newErrors.email = "(*) Invalid email format";
            isValid = false;
        }
        if (!formRegister.password) {
            newErrors.password = "(*) Password is required";
            isValid = false;
        } else if (formRegister.password.length < 8) {
            newErrors.password = "(*) Password must be at least 8 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true); // bật loading

            try {
                await handleRegister(formRegister);
                alert('Register is success');
                navigate('/login');
            } catch (error) {
                const message = error.response?.data?.message || "Registration failed";
                if (message.includes("email")) {
                    setErrors(prev => ({ ...prev, email: message }));
                } else {
                    setErrors(prev => ({ ...prev, password: message }));
                }
            } finally {
                setIsSubmitting(false); // tắt loading
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-register">
            <div className="name-row">
                <div className="flex-column">
                    <label>First Name</label>
                    <div className="input-form">
                        <input type="text" name='firstName' placeholder='Enter your First Name' className='input' value={formRegister.firstName} onChange={(e) => setFormRegister({ ...formRegister, firstName: e.target.value })} />
                    </div>
                    {errors.firstName && <div className="err">{errors.firstName}</div>}
                </div>
                <div className="flex-column">
                    <label>Last Name</label>
                    <div className="input-form">
                        <input type="text" name='lastName' placeholder='Enter your Last Name' className='input' value={formRegister.lastName} onChange={(e) => setFormRegister({ ...formRegister, lastName: e.target.value })} />
                    </div>
                    {errors.lastName && <div className="err">{errors.lastName}</div>}
                </div>
            </div>

            <div className="flex-column">
                <label>Email</label>
            </div>
            <div className="input-form">
                <input type="text" name="email" id="email" className="input" placeholder="Enter your Email" value={formRegister.email} onChange={(e) => setFormRegister({ ...formRegister, email: e.target.value })} />
            </div>
            {errors.email && <div className="err">{errors.email}</div>}

            <div className="flex-column">
                <label>Password</label>
            </div>
            <div className="input-form">
                <input type={hiddenPassword ? "text" : "password"} name="password" id="password" className="input" placeholder="Enter your Password" value={formRegister.password} onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })} />
                <i className={hiddenPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} onClick={() => setHiddenPassword(!hiddenPassword)}></i>
            </div>
            {errors.password && <div className="err">{errors.password}</div>}

            <div className="flex-row">
                <div className="remeber-account">
                    <input type="radio" />
                    <label> Remember me </label>
                </div>
                <span className="forgot-span">Forgot password?</span>
            </div>

            <button className="button-submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
            </button>

            <p className="p">You have an account? <span className="sign-up"><Link to={"/login"}>Sign in</Link></span></p>
            <p className="p line">Or With</p>
            <div className="flex-row">
                <button className="btn google"></button>
            </div>
        </form>
    );
};

export default FormRegister;
