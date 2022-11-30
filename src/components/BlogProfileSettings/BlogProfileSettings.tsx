import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBlog } from "../../interface/global";
import BlogProfileSettingsForm from "../BlogProfileSettingsForm/BlogProfileSettingsForm";
import style from "./BlogProfileSettings.module.css";

interface BlogProfileSettingsProps {
  blog: IBlog;
  updateBlogProfile: Function;
  deleteBlogProfile: Function;
  copyBlog: IBlog;
  setCopyBlogDataHandler: ChangeEventHandler;
}

const BlogProfileSettings: React.FC<BlogProfileSettingsProps> = ({
  blog,
  updateBlogProfile,
  deleteBlogProfile,
  copyBlog,
  setCopyBlogDataHandler,
}) => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (blog.id !== copyBlog.id) {
      setIsFormVisible(false);
    }
  }, [blog, copyBlog]);

  const openFormHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setIsFormVisible(!isFormVisible);
  };
  const deleteBlogHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event: any
  ) => {
    event.preventDefault();
    deleteBlogProfile(blog.id);
    navigate('/')
  };

  return (
    <div className={style.settings_wrapper}>
      <div className={style.settings_list}>
        <button className={style.settings_list_item} onClick={openFormHandler}>
          Редагувати
        </button>
        <button
          className={style.settings_list_item}
          onClick={deleteBlogHandler}
        >
          Видалити
        </button>
      </div>
      <div style={isFormVisible ? { display: "flex" } : { display: "none" }}>
        <BlogProfileSettingsForm
          updateBlogProfile={updateBlogProfile}
          copyBlog={copyBlog}
          setCopyBlogDataHandler={setCopyBlogDataHandler}
        />
      </div>
    </div>
  );
};

export default BlogProfileSettings;
