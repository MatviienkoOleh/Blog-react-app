import React from "react";
import { ICommentary } from "../../interface/global";
import style from "./CommentForm.module.css";

interface CommentFormProps {
  createCommentary: Function;
  commentary: ICommentary;
  onChangeCommentHandler: React.ChangeEventHandler<HTMLInputElement>;
  blogId: string;
  id: string;
  note: any;
}

const CommentForm: React.FC<CommentFormProps> = ({
  createCommentary,
  commentary,
  onChangeCommentHandler,
  blogId,
  id,
  note,
}) => {
  const createCommentaryWrapper: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    createCommentary(blogId, id, note);
  };

  return (
    <form className={style.comment_form} onSubmit={createCommentaryWrapper}>
      <input
        value={commentary.comment}
        onChange={onChangeCommentHandler}
        className={style.comment_form_input}
      />
      <button className={style.comment_form_button}>Створити коментарій</button>
    </form>
  );
};

export default CommentForm;
