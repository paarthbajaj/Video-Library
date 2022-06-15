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
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
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
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
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
            name !== "" ||
            email !== "" ||
            password !== "" ||
            confirm_password !== ""
              ? dispatch(
                  signupClickHandler({
                    name,
                    email,
                    password,
                    confirm_password,
                    navigate,
                  })
                )
              : dispatch(
                  setToast({
                    showToast: true,
                    type: "alert-danger",
                    message: "Please fill all the fields",
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
