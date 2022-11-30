import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { IBlog, IBlogInfo, ICommentary, INote } from "../../interface/global";
import BlogProfile from "../BlogProfile/BlogProfile";
import CreateNote from "../CreateNote/CreateNote";
import Header from "../Header/Header";
import NoteScreen from "../NoteScreen/NoteScreen";
import style from "./BlogScreen.module.css";

interface BlogScreenProps {
  auth: any;
  provider: any;
  createBlog: Function;
  onChangeHandler: React.ChangeEventHandler;
  blogInfo: IBlogInfo;
  blogs: IBlog[];

  blog: IBlog;
  createNote: Function;
  updateBlogProfile: Function;
  deleteBlogProfile: Function;
  copyBlog: IBlog;
  getBlog: Function;
  setCopyBlogDataHandler: ChangeEventHandler;
  note: INote;
  onChangeNoteHandler: ChangeEventHandler<HTMLInputElement>;
  increaseLikes: Function;
  increaseDislike: Function;
  user: any;
  onChangeCommentHandler: ChangeEventHandler<HTMLInputElement>;
  commentary: ICommentary;
  createCommentary: Function;
  deleteNote: Function;
}

const BlogScreen: React.FC<BlogScreenProps> = ({
  auth,
  provider,
  createBlog,
  onChangeHandler,
  blogInfo,
  blogs,

  blog,
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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const keysOfNotes = Object.keys(blog.notes);

  const createNoteInComponent: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    setIsVisible(!isVisible);
  };
  const createNoteWrapper: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    createNote(blog.id);
    setIsVisible(false);
  };

  return (
    <div>
      <Header
        blogInfo={blogInfo}
        onChangeHandler={onChangeHandler}
        createBlog={createBlog}
        auth={auth}
        provider={provider}
        blogs={blogs}
      />
      <div className={style.blog_screen_wrapper}>
        <section className={style.blog_description}>
          <BlogProfile
            user={user}
            blog={blog}
            updateBlogProfile={updateBlogProfile}
            deleteBlogProfile={deleteBlogProfile}
            copyBlog={copyBlog}
            getBlog={getBlog}
            setCopyBlogDataHandler={setCopyBlogDataHandler}
          />
          <div
            style={
              user && user.displayName === blog.name
                ? { display: "flex" }
                : { display: "none" }
            }
            className={style.create_new_note}
          >
            <button
              onClick={createNoteInComponent}
              className={style.create_note_button}
            >
              Створити Новий Запис
            </button>
          </div>
        </section>
        <div style={isVisible ? { display: "block" } : { display: "none" }}>
          <CreateNote
            createNoteInComponent={createNoteInComponent}
            onChangeNoteHandler={onChangeNoteHandler}
            note={note}
            createNoteWrapper={createNoteWrapper}
          />
        </div>
        <section className={style.notes_block}>
          {blog.notes
            ? keysOfNotes.reverse().map((key) => {
                let result =
                  key !== "count" ? (
                    <NoteScreen
                      key={key}
                      blogId={blog.id}
                      user={user}
                      blog={blog}
                      id={key}
                      increaseLikes={increaseLikes}
                      increaseDislike={increaseDislike}
                      onChangeCommentHandler={onChangeCommentHandler}
                      commentary={commentary}
                      createCommentary={createCommentary}
                      deleteNote={deleteNote}
                    />
                  ) : null;
                return result;
              })
            : null}
        </section>
      </div>
    </div>
  );
};

export default BlogScreen;
