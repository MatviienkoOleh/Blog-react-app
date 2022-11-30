import React, { ChangeEventHandler, useEffect, useState } from "react";
import { IBlog } from "../../interface/global";
import BlogProfileSettings from "../BlogProfileSettings/BlogProfileSettings";
import style from "./BlogProfile.module.css";

interface BlogProfileProps {
  user: any;
  blog: IBlog;
  updateBlogProfile: Function;
  deleteBlogProfile: Function;
  copyBlog: IBlog;
  getBlog: Function;
  setCopyBlogDataHandler: ChangeEventHandler;
}

const BlogProfile: React.FC<BlogProfileProps> = ({
  user,
  blog,
  updateBlogProfile,
  deleteBlogProfile,
  copyBlog,
  getBlog,
  setCopyBlogDataHandler,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (blog.id !== copyBlog.id) {
      setIsVisible(false);
    }
  }, [blog]);

  const blogSettingsWrapper: React.MouseEventHandler = (event) => {
    event.preventDefault();
    setIsVisible(!isVisible);
    getBlog(blog);
  };

  return (
    <div className={style.blog_info}>
      <h1 className={style.blog_header}>{blog.nameOfBlog}</h1>
      <div className={style.blog_main_block}>
        <div className={style.blog_settings}>
          {user && blog.name === user.displayName ? (
            <svg
              onClick={blogSettingsWrapper}
              className={`${style.vertical_menu} ${style.vertical_symbol}`}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M512 192c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64z m0 256c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64z m0 256c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64z"
                fill=""
              />
            </svg>
          ) : <div style={{width: '20px'}}></div>}
          <div style={isVisible ? { display: "flex" } : { display: "none" }}>
            <BlogProfileSettings
              blog={blog}
              updateBlogProfile={updateBlogProfile}
              deleteBlogProfile={deleteBlogProfile}
              copyBlog={copyBlog}
              setCopyBlogDataHandler={setCopyBlogDataHandler}
            />
          </div>
        </div>
        <main className={style.blog_main}>
          <img
            className={style.blog_img}
            src={blog.photo ? blog.photo : "/Assets/user_blog.png"}
          />
          <p className={style.blog_description}>{blog.desc}</p>
        </main>
      </div>
      <footer className={style.blog_footer_block}>
        <div className={style.blog_settings}></div>
        <div className={style.blog_footer}>
          <div className={style.blog_footer_description}>{blog.name}</div>
          <div className={style.blog_footer_description}>{blog.email}</div>
        </div>
      </footer>
    </div>
  );
};

export default BlogProfile;
