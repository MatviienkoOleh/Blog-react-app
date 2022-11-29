import React from "react";
import { IBlogInfo } from "../../interface/global";
import style from "./HeaderForm.module.css";

interface HeaderFormProps {
  onChangeHandler: React.ChangeEventHandler;
  blogInfo: IBlogInfo;
  createBlogWrapper: any;
}

const HeaderForm: React.FC<HeaderFormProps> = ({
  blogInfo,
  onChangeHandler,
  createBlogWrapper,
}) => {
  const { nameOfBlog, desc } = blogInfo;

  return (
    <form className={style.create_menu} onSubmit={createBlogWrapper}>
      <input
        className={style.create_menu_header}
        id="nameOfBlog"
        value={nameOfBlog}
        onChange={onChangeHandler}
        type="text"
        placeholder="Name of your blog"
      />
      <textarea
        className={style.create_menu_info}
        id="desc"
        value={desc}
        onChange={onChangeHandler}
        placeholder="Description"
      />
      <div className={style.create_menu_btn_block}>
        <button className={style.create_menu_button}>Створити блог</button>
      </div>
    </form>
  );
};

export default HeaderForm;
