import React, { useEffect, useState } from 'react';
import VideoListItem from './VideoListItem';
import { TESTDATA } from '../utils/utils';
import * as Api from '../../api'

const VideoList = ({ onVideoSelect, id }) => {
  const [videos, setVideos] = useState([])
  const initialVideos = async () => {
    try {
      const {data} = await Api.get('video/getVideos')
      setVideos(data.videos)
    }catch (e) {
      console.error(e)
    }
  }
 useEffect(()=>{
   initialVideos()
 }, [])
  const VideoItems = videos.map((video) => {
    console.log(video);
    return <VideoListItem onVideoSelect={onVideoSelect} key={video._id} video={video} />;
  });
  return <ul className="col-md-4 list-group">{VideoItems}</ul>;
};

export default VideoList;
