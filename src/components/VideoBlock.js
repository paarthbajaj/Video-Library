import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedVideo } from "../store/slices/actionSlice";
import { ActionMenu } from "./ActionMenu";

export const VideoBlock = ({ video }) => {
  const dispatch = useDispatch();
  const [showActionMenu, setShowActionMenu] = useState(false);
  const { thumbnail, title, views, creator, published_on } = video;
  let navigate = useNavigate();
  return (
    <>
      <div
        className="video-container cursor-pointer"
        onClick={() => dispatch(setSelectedVideo(video))}
      >
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          onClick={() => navigate("/watch")}
        />
        <div className="flex-row">
          <div className="channel-thumbnail">
            <img
              className="rounded-circle"
              src="https://img.pixers.pics/pho_wat(s3:700/FO/61/77/90/52/700_FO61779052_901a41093e1031898de621e91ce62fac.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/posters-abstract-square-background.jpg.jpg"
              alt="channel-thumbail"
            ></img>
          </div>
          <div className="video-meta-text">
            <h3 className="video-title">{title}</h3>
            <div className="video-channel-name">{creator}</div>
            <div className="video-meta-info flex-row">
              <span className="video-views">{views}</span>
              <span>•</span>
              <span className="video-age">{published_on}</span>
            </div>
          </div>
          <ActionMenu
            showActionMenu={showActionMenu}
            setShowActionMenu={setShowActionMenu}
            video={video}
          />
        </div>
      </div>
    </>
  );
};
