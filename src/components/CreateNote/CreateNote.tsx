import React from "react";
import { INote } from "../../interface/global";
import style from "./CreateNote.module.css";

interface CreateNoteProps {
  onChangeNoteHandler: React.ChangeEventHandler;
  note: INote;
  createNoteWrapper: React.MouseEventHandler;
  createNoteInComponent: React.MouseEventHandler;
}

const CreateNote: React.FC<CreateNoteProps> = ({
  onChangeNoteHandler,
  note,
  createNoteWrapper,
  createNoteInComponent,
}) => {
  return (
    <div className={style.note_wrapper}>
      <div className={style.note_close_btn}>
        <button
          onClick={createNoteInComponent}
          className={style.note_close_button}
        >
          ❌
        </button>
      </div>
      <h2 className={style.note_header}>Новий допис</h2>
      <form className={style.note_form}>
        <input
          id="header"
          className={style.note_form_header}
          value={note.header}
          type="text"
          placeholder="Header of the Note"
          onChange={onChangeNoteHandler}
        />
        <textarea
          id="text"
          className={style.note_form_paragraph}
          onChange={onChangeNoteHandler}
          value={note.text}
          placeholder="Type notes"
        />
        <div className={style.note_button_block}>
          <button
            className={style.note_form_button}
            onClick={createNoteWrapper}
          >
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
