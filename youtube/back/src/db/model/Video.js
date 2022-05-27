import { Video } from "../schema/video";

class VideoModel {
  static create = ({
    writer,
    title,
    description,
    filePath,
    views,
    duration,
    thumbnail,
  }) => {
    const newVideo = new Video({
      writer,
      title,
      description,
      filePath,
      views,
      duration,
      thumbnail,
    });
    newVideo.save();
  };

  static get = async () => {
    const videos = await Video.find()
      .populate("writer", "_id email name image")
      .exec();
    return videos;
  };

  static findById = async (id) => {
    const video = await Video.findOne({ _id: id }).populate("writer").exec();
    return video;
  };

  static deleteById = async (id) => {
    const deleted = await Video.deleteOne({ _id: id });
    const isVideoDeleted = deleted.deletedCount === 1;
    return isVideoDeleted;
  };

  static findByWriter = async (writer) => {
    const video = await Video.find({ writer: { $in: writer } })
      .populate("writer")
      .exec();
    return video;
  };
}

export { VideoModel };
