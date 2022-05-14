import { useAuth } from "../context/AuthContext";
import "./Auth.css";
export const Signup = () => {
  const { signupClickHandler, authDispatch } = useAuth();
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
            className="input log-input req-input"
            type="text"
            placeholder="Name"
            required
            onChange={(e) =>
              authDispatch({ type: "EDIT_NAME", payload: e.target.value })
            }
          />
          <span className="error">Please enter your name</span>
        </label>
        <label className="log-input">
          <input
            className="input log-input req-input"
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              authDispatch({ type: "EDIT_EMAIL", payload: e.target.value })
            }
          />
          <span className="error">Please enter your email</span>
        </label>
        <label className="log-input">
          <input
            className="input log-input req-input"
            type="password"
            placeholder="Password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            required
            onChange={(e) =>
              authDispatch({ type: "EDIT_PASSWORD", payload: e.target.value })
            }
          />
          <span className="error">
            Password must contain eight characters, at least one letter, one
            number and one special character
          </span>
        </label>
        <label className="log-input">
          <input
            className="input log-input req-input"
            type="password"
            placeholder="Confirm Password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            required
            onChange={(e) =>
              authDispatch({
                type: "EDIT_CONFIRM_PASSWORD",
                payload: e.target.value,
              })
            }
          />
          <span className="error">
            Password must contain eight characters, at least one letter, one
            number and one special character
          </span>
        </label>
        <button
          className="vl-pri-btn"
          type="submit"
          onClick={signupClickHandler}
        >
          Sign Up
        </button>
        <span className="or-divider">OR</span>
        <a href="./signin.html">
          <button type="button" className="btn btn-secondary">
            Sign In
          </button>
        </a>
      </form>
    </div>
  );
};
