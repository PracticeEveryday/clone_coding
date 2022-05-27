import React from "react";
import moment from "moment";
const VideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = `http://localhost:3001/${video.thumbnail}`;

  return (
    <li onClick={() => onVideoSelect(video)} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl} />
        </div>

        <div className="media-body">
          <div className="media-heading">{video.title}</div>
          <div className="media-heading">{video.writer.name}</div>
          <div className="media-heading">
            {moment(video.createdAt).format("YYYY-MM-DD")}
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
