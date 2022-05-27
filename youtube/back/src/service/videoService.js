import { CommentModel, LikeModel, VideoModel } from "../db/index";

class VideoService {
  static create = (videoData) => {
    VideoModel.create(videoData);
  };

  static getVideos = async () => {
    const videos = await VideoModel.get();
    return videos;
  };

  static getVideoDetail = async (id) => {
    const video = await VideoModel.findById(id);
    return video;
  };

  static getVideoByWriter = async (writer) => {
    const video = await VideoModel.findByWriter(writer);
    return video;
  };

  static deleteVideo = async (id) => {
    const isVideoDeleted = await VideoModel.deleteById(id);
    if (!isVideoDeleted) {
      const errorMessage = "존재하지 않는 동영상입니다.";
      return { errorMessage };
    }
    await LikeModel.deleteAll(id);
    await CommentModel.deleteAll(id);
    return { status: "success" };
  };
}
export { VideoService };
