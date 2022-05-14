import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";
export const Signin = () => {
  const { signInAsGuest } = useAuth();
  return (
    <div className="signin-page">
      <img
        className="auth-img"
        src="/assets/images/Video Library Background.svg"
        alt="video-library-background-image"
      />
      <h1 className="txt-center txt-4">Login to your account</h1>
      <h2 style={{ color: "red", textAlign: "center" }}>
        Please click on signin as guest, as signin and signup are not working
        yet
      </h2>
      <form className="auth-form flex-column g-1 align-center justify-center">
        <label className="log-input">
          <input
            className="input log-input req-input"
            type="email"
            placeholder="Email"
            required
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
          />
          <span className="error">
            Password must contain eight characters, at least one letter, one
            number and one special character
          </span>
        </label>
        <Link to="/home">
          <button className="vl-pri-btn" type="submit">
            Sign In
          </button>
        </Link>
        <Link to="/home">
          <span className="cursor-pointer" onClick={signInAsGuest}>
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
