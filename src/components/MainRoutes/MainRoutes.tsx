import React, { ChangeEventHandler} from "react";
import { Routes, Route } from "react-router-dom";
import { IBlog, IBlogInfo, ICommentary, INote } from "../../interface/global";
import BlogScreen from "../BlogScreen/BlogScreen";
import Header from "../Header/Header";

interface MainRoutesProps {
  auth: any;
  provider: any;
  createBlog: Function;
  onChangeHandler: React.ChangeEventHandler;
  blogInfo: IBlogInfo;

  blogs: IBlog[];
  createNote: Function;
  updateBlogProfile: Function;
  deleteBlogProfile: Function;
  note: INote;
  onChangeNoteHandler: ChangeEventHandler<HTMLInputElement>;
  increaseLikes: Function;
  increaseDislike: Function;
  user: any;
  onChangeCommentHandler: ChangeEventHandler<HTMLInputElement>;
  commentary: ICommentary;
  createCommentary: Function;
  deleteNote: Function;
  copyBlog: IBlog;
  getBlog: Function;
  setCopyBlogDataHandler: ChangeEventHandler;
}

const MainRoutes: React.FC<MainRoutesProps> = ({
  auth,
  provider,
  createBlog,
  onChangeHandler,
  blogInfo,

  blogs,
  createNote,
  updateBlogProfile,
  deleteBlogProfile,
  copyBlog,
  getBlog,
  setCopyBlogDataHandler,
  note,
  onChangeNoteHandler,
  increaseLikes,
  increaseDislike,
  user,
  onChangeCommentHandler,
  commentary,
  createCommentary,
  deleteNote,
}) => {
  return (
    <>
      <Routes>
        <Route
          path={"/"}
          element={
            <Header
              auth={auth}
              provider={provider}
              createBlog={createBlog}
              onChangeHandler={onChangeHandler}
              blogInfo={blogInfo}
              blogs={blogs}
            />
          }
        />
        {blogs
          ? blogs.map((blog, index) => {
              return (
                <Route
                  key={blog.id}
                  path={`/${blog.nameOfBlog}`}
                  element={
                    <BlogScreen
                    auth={auth}
                    provider={provider}
                    createBlog={createBlog}
                    onChangeHandler={onChangeHandler}
                    blogInfo={blogInfo}
                    blogs={blogs}


                      createCommentary={createCommentary}
                      commentary={commentary}
                      onChangeCommentHandler={onChangeCommentHandler}
                      createNote={createNote}
                      updateBlogProfile={updateBlogProfile}
                      deleteBlogProfile={deleteBlogProfile}
                      copyBlog={copyBlog}
                      getBlog={getBlog}
                      setCopyBlogDataHandler={setCopyBlogDataHandler}
                      blog={blog}
                      note={note}
                      onChangeNoteHandler={onChangeNoteHandler}
                      increaseLikes={increaseLikes}
                      increaseDislike={increaseDislike}
                      user={user}
                      deleteNote={deleteNote}
                    />
                  }
                />
              );
            })
          : null}
      </Routes>
    </>
  );
};

export default MainRoutes;
