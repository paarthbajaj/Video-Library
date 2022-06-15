import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToast } from "../store/slices/actionSlice";
import { setEmail, setPassword } from "../store/slices/authSlice";
import { signInAsGuest, signinClickHandler } from "../store/thunks/authThunk";
import "./Auth.css";
export const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);
  return (
    <div className="signin-page">
      <img
        className="auth-img"
        src="/assets/images/Video Library Background.svg"
        alt="video-library-background-image"
      />
      <h1 className="txt-center txt-4">Login to your account</h1>
      <form className="auth-form flex-column g-1 align-center justify-center">
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
        <button
          className="vl-pri-btn"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            email !== "" || password !== ""
              ? dispatch(signinClickHandler({ email, password, navigate }))
              : dispatch(
                  setToast({
                    showToast: true,
                    type: "alert-danger",
                    message: "Please fill all the fields",
                  })
                );
          }}
        >
          Sign In
        </button>
        <Link to="/home">
          <span
            className="cursor-pointer"
            onClick={() => dispatch(signInAsGuest())}
          >
            Sign In As Guest
          </span>
        </Link>
        <span className="or-divider">OR</span>
        <Link to="/signup">
          <button type="button" className="btn btn-secondary">
            Sign Up
          </button>
        </Link>
      </form>
    </div>
  );
};
