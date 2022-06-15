import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./components/Navbar";
import { History } from "./components/History";
import { WatchLater } from "./components/WatchLater";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Playlists } from "./components/Playlists";
import { SingleVideoPage } from "./components/SingleVideoPage";
import { LikedVideos } from "./components/LikedVideos";
import { CategoryPage } from "./components/CategoryPage";
import { Toast } from "./components/Toast";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/history" element={<History />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/watch" element={<SingleVideoPage />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
      <Toast />
    </div>
  );
}

export default App;
