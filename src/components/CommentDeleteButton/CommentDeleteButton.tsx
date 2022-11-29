import React from "react";
import { IBlog } from "../../interface/global";
import style from "./CommentDeleteButton.module.css";

interface CommentDeleteButton {
  id: string;
  blog: IBlog;
  deleteNote: Function;
}

const CommentDeleteButton: React.FC<CommentDeleteButton> = ({
  id,
  blog,
  deleteNote,
}) => {
  const deleteNoteWrapper: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    deleteNote(blog.id, id);
  };
  return (
    <div
      style={
        blog.notes[id].count % 2 === 0 ? { left: "50px" } : { right: "50px" }
      }
      className={style.note_settings_block}
    >
      <button
        onClick={deleteNoteWrapper}
        className={style.note_settings_delete_note}
      >
        Видалити
      </button>
    </div>
  );
};

export default CommentDeleteButton;
