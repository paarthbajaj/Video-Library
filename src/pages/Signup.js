import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToast } from "../store/slices/actionSlice";
import {
  setConfirmPassword,
  setEmail,
  setName,
  setPassword,
} from "../store/slices/authSlice";
import { signupClickHandler } from "../store/thunks/authThunk";
import "./Auth.css";

const emailValidation =
  /[_A-Za-z0-9\-+]+(\.[_A-Za-z0-9\-]+)*@[A-Za-z0-9\-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,3})/;
export const Signup = () => {
  const dispatch = useDispatch();
  const { name, email, password, confirm_password } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  return (
    <div className="signin-page">
      <img
        className="auth-img"
        src="/assets/images/Video Library Background.svg"
        alt="video-library-background-image"
      />
      <h1 className="txt-center txt-4">Sign Up to VL Player</h1>
      <form className="auth-form flex-column g-1 align-center justify-center">
        <label className="log-input">
          <input
            className="input log-input"
            type="text"
            placeholder="Name"
            required
            onChange={(e) => dispatch(setName(e.target.value))}
          />
          <span className="error">Please enter your name</span>
        </label>
        <label className="log-input">
          <input
            className="input log-input"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <span className="error">Please enter your email</span>
        </label>
        <label className="log-input">
          <input
            className="input log-input"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <span className="error">
            Password must contain eight characters, at least one letter, one
            number and one special character
          </span>
        </label>
        <label className="log-input">
          <input
            className="input log-input"
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
          />
          <span className="error">
            Password must contain eight characters, at least one letter, one
            number and one special character
          </span>
        </label>
        <button
          className="vl-pri-btn"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (
              name == "" ||
              email == "" ||
              password == "" ||
              confirm_password == ""
            )
              dispatch(
                setToast({
                  showToast: true,
                  type: "alert-danger",
                  message: "Please fill the fields",
                })
              );
            else if (!emailValidation.test(email))
              dispatch(
                setToast({
                  showToast: true,
                  type: "alert-danger",
                  message: "Please enter the valid email",
                })
              );
            else if (password.length < 7)
              dispatch(
                setToast({
                  showToast: true,
                  type: "alert-danger",
                  message: "Password must of 8 or more characters",
                })
              );
            else if (password !== confirm_password)
              dispatch(
                setToast({
                  showToast: true,
                  type: "alert-danger",
                  message: "Passwords must be same",
                })
              );
            else if (
              name !== "" ||
              email !== "" ||
              password !== "" ||
              confirm_password !== ""
            )
              dispatch(
                signupClickHandler({
                  name,
                  email,
                  password,
                  confirm_password,
                  navigate,
                })
              );
          }}
        >
          Sign Up
        </button>
        <span className="or-divider">OR</span>
        <Link to="/">
          <button type="button" className="btn btn-secondary">
            Sign In
          </button>
        </Link>
      </form>
    </div>
  );
};
