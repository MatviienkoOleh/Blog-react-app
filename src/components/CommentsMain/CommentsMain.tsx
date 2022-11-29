import React from "react";
import { IBlog, ICommentary } from "../../interface/global";
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";
import style from "./CommentsMain.module.css";

interface CommentsMain {
  setIsVisible: Function;
  isVisible: boolean;
  blog: IBlog;
  id: string;
  user: any;
  onChangeCommentHandler: React.ChangeEventHandler<HTMLInputElement>;
  commentary: ICommentary;
  createCommentary: Function;
  blogId: string;
}

const CommentsMain: React.FC<CommentsMain> = ({
  setIsVisible,
  isVisible,
  blog,
  id,
  user,
  onChangeCommentHandler,
  commentary,
  createCommentary,
  blogId,
}) => {
  return (
    <>
      <div className={style.note_comments_close_block}>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={style.note_comments_close_btn}
        >
          X
        </button>
      </div>
      <CommentForm
        commentary={commentary}
        onChangeCommentHandler={onChangeCommentHandler}
        blogId={blogId}
        id={id}
        note={blog.notes[id]}
        createCommentary={createCommentary}
      />
      {blog.notes[id]
        ? blog.notes[id].arrayOfComments
            .filter((comment: ICommentary) => {
              return comment.user !== "name";
            })
            .reverse()
            .map((comment: ICommentary, index: number) => {
              return (
                <Comment key={index} comment={comment} id={id} user={user} />
              );
            })
        : null}
    </>
  );
};

export default CommentsMain;
