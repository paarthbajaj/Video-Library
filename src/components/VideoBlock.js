export const VideoBlock = () => {
  return (
    <>
      <div className="video-container cursor-pointer">
        <img src="https://picsum.photos/400/200"></img>
        <div className="flex-row">
          <div>
            <img
              className="channel-thumbnail rounded-circle"
              src="https://picsum.photos/50"
            ></img>
          </div>
          <div className="video-meta-text">
            <h3 className="video-title">
              Marvel Studios' Thor: Love and Thunder | Official Teaser
            </h3>
            <div className="video-channel-name">Marvel Entertainment</div>
            <div className="video-meta-info flex-row">
              <span className="video-views">100M views</span>
              <span>•</span>
              <span className="video-age">12 days ago</span>
            </div>
          </div>
          <i class="far fa-ellipsis-v action-menu"></i>
        </div>
      </div>
    </>
  );
};
