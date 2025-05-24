import "./FormLogin.scss";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../service/ApiService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/Export";
import { toast } from "react-toastify";
const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.user);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (user?.isauthentic === true) {
      localStorage.setItem("accessToken", user?.account?.accessToken);
      localStorage.setItem("refreshToken", user?.account?.refreshToken);
      toast.success(`Welcome ${user.account.email} to home`);
      navigate("/");
    }
  }, [user]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formLogin.email) {
      newErrors.email = "(*) Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formLogin.email)) {
      newErrors.email = "(*) Invalid email format";
      isValid = false;
    }

    if (!formLogin.password) {
      newErrors.password = "(*) Password is required";
      isValid = false;
    } else if (formLogin.password.length < 8) {
      newErrors.password = "(*) Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        dispatch(action.UserLoginRedux(formLogin));
        // const response = await handleLogin(formLogin);
        // if (response && response.EC === 0) {
        //     localStorage.setItem("accessToken", response.payloadToken.accessToken);
        //     localStorage.setItem("user", JSON.stringify(response.data));

        //     navigate('/');
        // } else {
        //     setErrors(prev => ({ ...prev, password: response.MES || "Email or password is incorrect" }));
        // }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          password: "Email or password is incorrect",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const [hidenPassword, setHidenPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit} action="login" className="form-login">
      <div className="flex-column">
        <label>Email</label>
      </div>
      <div className="input-form">
        <input
          type="text"
          name="email"
          id="email"
          className="input"
          placeholder="Enter your Email"
          value={formLogin.email}
          onChange={(e) =>
            setFormLogin({ ...formLogin, email: e.target.value })
          }
        />
      </div>
      {errors.email && <div className="err">{errors.email}</div>}
      <div className="flex-column">
        <label>Password</label>
      </div>
      <div className="input-form">
        <input
          type={hidenPassword === false ? "password" : "text"}
          name="password"
          id="password"
          className="input"
          placeholder="Enter your Password"
          value={formLogin.password}
          onChange={(e) =>
            setFormLogin({ ...formLogin, password: e.target.value })
          }
        />
        <i
          className={
            hidenPassword === false
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
          onClick={() => setHidenPassword(!hidenPassword)}
        ></i>
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
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
      <p className="p">
        Don't have an account?{" "}
        <span className="sign-up">
          <Link to={"/register"}>Sign Up</Link>
        </span>
      </p>
      <p className="p line">Or With</p>
      <div className="flex-row">
        <button className="btn google"></button>
      </div>
    </form>
  );
};

export default FormLogin;
