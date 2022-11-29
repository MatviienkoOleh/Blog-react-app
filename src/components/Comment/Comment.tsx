import React from "react";
import { ICommentary } from "../../interface/global";
import style from "./Comment.module.css";

interface CommentProps {
  comment: ICommentary;
  id: string;
  user: any;
}

const Comment: React.FC<CommentProps> = ({ id, user, comment }) => {
  return (
    <div
      key={id}
      style={
        user && String(user.email) === comment.email
          ? { justifyContent: "flex-end", marginLeft: "20px" }
          : { justifyContent: "flex-start", marginRight: "20px" }
      }
      className={style.note_comments_section_block}
    >
      {user && String(user.email) === comment.email ? (
        <div className={style.comment_my}>
          <div className={style.comment_comment_my}>{comment.comment}</div>
          <div className={style.comment_name_my}>{comment.user}</div>
        </div>
      ) : (
        <div className={style.comment}>
          <div className={style.comment_name}>{comment.user}</div>
          <div className={style.comment_comment}>{comment.comment}</div>
        </div>
      )}
    </div>
  );
};

export default Comment;
