import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as Api from "../../api";
import axios from "axios";
import { Avatar, TextField } from "@mui/material";

const VideoDetailComment = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState(null);
  const [lastComent, setLastComent] = useState('');
  const inputComment = useRef(null);

  const getComments = async () => {
    try {
      const { data } = await Api.post("comments", { video_id: id });
      setComments(data.comments.reverse());
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getComments().then((res) => console.log(res));
  }, [id, lastComent]);

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const onEnterKeypress = (e) => {
    if (e.key === "Enter") {
      commentWriteHandler();
    }
  };

  const commentWriteHandler = async () => {
    if (!sessionStorage.getItem("userToken")) {
      return alert("로그인이 필요한 서비스입니다.");
    } else if (!content || content === "") {
      return alert("댓글 내용을 작성해주세요.");
    }
    try {
      const { data } = await Api.get("verify");
      console.log("data.userId", data.userId);
      await Api.post("comment", {
        writer: data.userId,
        video_id: id,
        content: content,
      })
        .then((res) => {
          console.log("댓글 등록 완료!");
          setContent(null);
          inputComment.current.value = "";
          getComments();
          setLastComent(content)
        })
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <TextField
        label="댓글추가"
        variant="outlined"
        fullWidth
        placeholder="내용을 입력해주세요."
        onChange={contentHandler}
        inputRef={inputComment}
        onKeyPress={onEnterKeypress}
      />
      <div className="commentButtonWrapper">
        <button onClick={commentWriteHandler}>작성</button>
      </div>
      {comments.length != 0 ? (
        comments.map((comment) => {
          console.log("comment", comment);
          return (
            <>
              <div className="commentsWrapper">
                <Avatar src="/static/images/avatar/1.jpg" />
                <div className="writerInfo">
                  <div>{comment?.writer?.name}</div>
                  <div>{comment.content}</div>
                </div>
              </div>
            
            </>
          );
        })
      ) : (
        <div className="noneComment">댓글이 아직 없습니다.</div>
      )}
    </>
  );
};

export default VideoDetailComment;





