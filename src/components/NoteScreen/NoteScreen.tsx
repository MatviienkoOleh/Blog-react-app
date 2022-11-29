import React, { ChangeEventHandler, useState } from "react";
import { IBlog, ICommentary } from "../../interface/global";
import Comment from "../Comment/Comment";
import CommentDeleteButton from "../CommentDeleteButton/CommentDeleteButton";
import CommentForm from "../CommentForm/CommentForm";
import CommentsMain from "../CommentsMain/CommentsMain";
import style from "./NoteScreen.module.css";

interface NoteScreenProps {
  blog: IBlog;
  id: string;
  increaseLikes: Function;
  increaseDislike: Function;
  user: any;
  onChangeCommentHandler: ChangeEventHandler<HTMLInputElement>;
  commentary: ICommentary;
  createCommentary: Function;
  blogId: string;
  deleteNote: Function;
}

const NoteScreen: React.FC<NoteScreenProps> = ({
  blog,
  id,
  increaseLikes,
  increaseDislike,
  user,
  onChangeCommentHandler,
  commentary,
  createCommentary,
  blogId,
  deleteNote,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [noteSettings, setNoteSettings] = useState<boolean>(false);
  const increaseLikesWrapper: React.MouseEventHandler = (event) => {
    event.preventDefault();
    increaseLikes(blog.id, id, blog.notes[id].likes, blog.notes[id]);
  };
  const increaseDislikeWrapper: React.MouseEventHandler = (event) => {
    event.preventDefault();
    increaseDislike(blog.id, id, blog.notes[id].dislike, blog.notes[id]);
    console.log(user);
  };

  return (
    <div
      className={style.note_wrapper}
      style={
        blog.notes[id].count % 2 === 0
          ? { alignItems: "flex-Start" }
          : { alignItems: "flex-End" }
      }
    >
      <div className={style.note}>
        <header className={style.note_header}>
          <h3>{blog.notes[id].header}</h3>
        </header>
        <p>{blog.notes[id].text}</p>
      </div>
      <footer className={style.note_views_section}>
        <div onClick={increaseLikesWrapper} className={style.note_likes}>
          <span className={style.note_symbol}>&#128077;</span>{" "}
          {blog.notes[id].likes}
        </div>
        <div onClick={increaseDislikeWrapper} className={style.note_dislike}>
          <span className={style.note_symbol}>&#128078;</span>{" "}
          {blog.notes[id].dislike}
        </div>
        <div>
          <svg
            onClick={() => setIsVisible(!isVisible)}
            className={`${style.note_comments} ${style.note_symbol}`}
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 121.86 122.88"
          >
            <path d="M30.28,110.09,49.37,91.78A3.84,3.84,0,0,1,52,90.72h60a2.15,2.15,0,0,0,2.16-2.16V9.82a2.16,2.16,0,0,0-.64-1.52A2.19,2.19,0,0,0,112,7.66H9.82A2.24,2.24,0,0,0,7.65,9.82V88.55a2.19,2.19,0,0,0,2.17,2.16H26.46a3.83,3.83,0,0,1,3.82,3.83v15.55ZM28.45,63.56a3.83,3.83,0,1,1,0-7.66h53a3.83,3.83,0,0,1,0,7.66Zm0-24.86a3.83,3.83,0,1,1,0-7.65h65a3.83,3.83,0,0,1,0,7.65ZM53.54,98.36,29.27,121.64a3.82,3.82,0,0,1-6.64-2.59V98.36H9.82A9.87,9.87,0,0,1,0,88.55V9.82A9.9,9.9,0,0,1,9.82,0H112a9.87,9.87,0,0,1,9.82,9.82V88.55A9.85,9.85,0,0,1,112,98.36Z" />
          </svg>
          <div
            className={style.note_comments_section}
            style={isVisible ? { display: "flex" } : { display: "none" }}
          >
            <CommentsMain
              setIsVisible={setIsVisible}
              isVisible={isVisible}
              commentary={commentary}
              onChangeCommentHandler={onChangeCommentHandler}
              blogId={blogId}
              id={id}
              blog={blog}
              createCommentary={createCommentary}
              user={user}
            />
          </div>
        </div>
        <div>
          {user && blog.name === user.displayName ? (
            <svg
              onClick={() => setNoteSettings(!noteSettings)}
              className={`${style.note_settings} ${style.note_symbol}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          ) : null}
          <div style={noteSettings ? { display: "flex" } : { display: "none" }}>
            <CommentDeleteButton blog={blog} id={id} deleteNote={deleteNote} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NoteScreen;
