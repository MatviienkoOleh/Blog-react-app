import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBlog } from "../../interface/global";
import style from "./BlogProfileSettingsForm.module.css";

interface BlogProfileSettingsFormProps {
  updateBlogProfile: Function;
  copyBlog: IBlog;
  setCopyBlogDataHandler: ChangeEventHandler;
}

const BlogProfileSettingsForm: React.FC<BlogProfileSettingsFormProps> = ({
  updateBlogProfile,
  copyBlog,
  setCopyBlogDataHandler,
}) => {
  const navigate = useNavigate();

  const changeBlogButtonHandler = (event: any) => {
    updateBlogProfile(copyBlog);
    navigate('/')
  };

  return (
    <form className={style.blog_settings_form} onSubmit={changeBlogButtonHandler}>
      <label htmlFor="header">Header</label>
      <input
        className={style.blog_settings_form_input}
        name="header"
        id='nameOfBlog'
        placeholder="Header"
        value={copyBlog?.nameOfBlog}
        onChange={setCopyBlogDataHandler}
      />
      <label htmlFor="description">description</label>
      <textarea
        className={style.blog_settings_form_textarea}
        name="description"
        id="desc"
        placeholder="description"
        value={copyBlog.desc}
        onChange={setCopyBlogDataHandler}
      ></textarea>
      <button>Change</button>
    </form>
  );
};

export default BlogProfileSettingsForm;
