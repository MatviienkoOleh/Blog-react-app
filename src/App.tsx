import React, { useContext, useEffect, useState } from "react";
import style from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "./index";
import {
  IBlog,
  IBlogInfo,
  ICommentary,
  IContext,
  INote,
} from "./interface/global";
import MainRoutes from "./components/MainRoutes/MainRoutes";
import { idText } from "typescript";
import { remove } from "firebase/database";

function App() {
  const { auth, provider, db, push, ref, onValue, update } =
    useContext<IContext>(Context);
  const [user] = useAuthState(auth);
  const [blogsFlag, setBlogsFlag] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [blogInfo, setBlogInfo] = useState<IBlogInfo>({
    nameOfBlog: "",
    desc: "",
  });
  const [note, setNoteText] = useState<INote>({
    header: "",
    text: "",
  });
  const [commentary, setCommentary] = useState<ICommentary>({
    user: "",
    email: "",
    comment: "",
  });
  const [copyBlog, setCopyBlog] = useState<IBlog>({
    desc: "",
    email: "",
    id: "",
    name: "",
    nameOfBlog: "",
    photo: "",
    uid: "",
    notes: "",
  });
  useEffect(() => {
    downloadBlogs();
  }, [blogsFlag]);
  useEffect(() => {}, [user]);

  const downloadBlogs: Function = () => {
    const reference = ref(db, "Blogs");
    onValue(reference, (snapshot: any) => {
      const downBlogs = snapshot.val();
      const keys = Object.keys(downBlogs);
      const arrayOfBlogs = keys.map((key) => {
        let el = {
          ...downBlogs[key],
          id: key,
        };
        return el;
      });
      setBlogs(arrayOfBlogs);
    });
    setBlogsFlag(false);
  };
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value, id },
  }) => {
    setBlogInfo({
      ...blogInfo,
      [id]: value,
    });
  };
  const createBlog: Function = () => {
    const newBlog = {
      ...blogInfo,
      name: user?.displayName,
      uid: user?.uid,
      photo: user?.photoURL,
      email: user?.email,
      notes: {
        count: 1,
      },
    };
    push(ref(db, "Blogs"), newBlog);
    setBlogsFlag(true);
    setBlogInfo({
      nameOfBlog: "",
      desc: "",
    });
  };
  const getBlog: Function = (blog: IBlog) => {
    setCopyBlog((list) => {
      return {
        ...list,
        ...blog,
      };
    });
  };
  const setCopyBlogDataHandler: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value, id },
  }) => {
    setCopyBlog({
      ...copyBlog,
      [id]: value,
    });
  };
  const updateBlogProfile: Function = (copyBlog: IBlog) => {
    const reference = ref(db, `Blogs/${copyBlog.id}`);
    blogs.forEach((oldBLog) => {
      if (oldBLog.id === copyBlog.id) {
        update(reference, {
          ...oldBLog,
          ...copyBlog,
        });
      }
    });
  };
  const deleteBlogProfile: Function = (blogId: string) => {
    const reference = ref(db, `Blogs/${blogId}`);
    remove(reference);
  };
  const createNote: Function = (id: string) => {
    const reference = ref(db, `Blogs/${id}`);

    blogs.forEach((blog) => {
      if (id === blog.id) {
        update(reference, {
          ...blog,
          notes: {
            ...blog.notes,
            count: blog.notes.count + 1,
            [blog.notes.count]: {
              header: note.header,
              text: note.text,
              likes: 0,
              dislike: 0,
              arrayOfEmail: ["oleh@gmail.com"],
              arrayOfDislikes: ["oleh@gmail.com"],
              arrayOfComments: [
                {
                  email: "first Comment",
                  user: "name",
                  comment: "first comment",
                },
              ],
              count: blog.notes.count,
            },
          },
        });
      }
    });
  };
  const deleteNote: Function = (blogId: string, noteId: string) => {
    const reference = ref(db, `Blogs/${blogId}/notes/${noteId}`);
    remove(reference);
  };
  const onChangeNoteHandler: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { id, value },
  }) => {
    setNoteText({
      ...note,
      [id]: value,
    });
  };
  const increaseLikes: Function = (
    blogId: string,
    noteId: string,
    likes: number,
    note: any
  ) => {
    if (user) {
      const userEmail = user?.email;
      const reference = ref(db, `Blogs/${blogId}/notes/${noteId}`);
      let isEmail: boolean = false;

      note.arrayOfEmail.forEach((email: string) => {
        if (email === userEmail) {
          isEmail = true;
        }
      });
      note.arrayOfEmail.forEach((email: string) => {
        if (isEmail) {
          let copyArr: string[] = [...note.arrayOfEmail];
          const minusLikes = likes - 1;
          const newArr = copyArr.filter((email: string) => {
            return email !== String(userEmail);
          });
          update(reference, {
            ...note,
            arrayOfEmail: newArr,
            likes: minusLikes,
          });
        } else if (!isEmail) {
          let copyArr: string[] = [...note.arrayOfEmail];
          copyArr.push(String(userEmail));
          const addLikes = likes + 1;

          update(reference, {
            ...note,
            arrayOfEmail: copyArr,
            likes: addLikes,
          });
        }
      });
    } else {
      alert("Для того щоб залишити лайк, будь ласка авторизуйтесь!");
    }
  };
  const increaseDislike: Function = (
    blogId: string,
    noteId: string,
    dislike: number,
    note: any
  ) => {
    if (user) {
      const userEmail = user?.email;
      const reference = ref(db, `Blogs/${blogId}/notes/${noteId}`);
      let isEmail: boolean = false;

      note.arrayOfDislikes.forEach((email: string) => {
        if (email === userEmail) {
          isEmail = true;
        }
      });
      note.arrayOfDislikes.forEach((email: string) => {
        if (isEmail) {
          let copyArr: string[] = [...note.arrayOfEmail];
          const minusDislike = dislike - 1;
          const newArr = copyArr.filter((email: string) => {
            return email !== String(userEmail);
          });
          update(reference, {
            ...note,
            arrayOfDislikes: newArr,
            dislike: minusDislike,
          });
        } else if (!isEmail) {
          let copyArr: string[] = [...note.arrayOfEmail];
          copyArr.push(String(userEmail));
          const addDislike = dislike + 1;

          update(reference, {
            ...note,
            arrayOfDislikes: copyArr,
            dislike: addDislike,
          });
        }
      });
    } else {
      alert("Для того щоб залишити дизлайк, будь ласка авторизуйтесь!");
    }
  };
  const createCommentary: Function = (
    blogId: string,
    noteId: string,
    note: any
  ) => {
    if (user) {
      const reference = ref(db, `Blogs/${blogId}/notes/${noteId}`);
      let copyArray = [...note.arrayOfComments];

      copyArray.push({
        ...commentary,
        user: user?.displayName,
        email: user?.email,
      });

      update(reference, {
        ...note,
        arrayOfComments: copyArray,
      });
    } else {
      alert("Якщо ви хочете залишити коментарій будь ласка Авторизуйтеся!");
    }
  };
  const onChangeCommentHandler: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setCommentary({
      ...commentary,
      comment: value,
    });
  };

  return (
    <Router>
      <div className={style.app}>
        <MainRoutes
          blogInfo={blogInfo}
          onChangeHandler={onChangeHandler}
          createBlog={createBlog}
          auth={auth}
          provider={provider}
          copyBlog={copyBlog}
          user={user}
          increaseLikes={increaseLikes}
          increaseDislike={increaseDislike}
          blogs={blogs}
          updateBlogProfile={updateBlogProfile}
          deleteBlogProfile={deleteBlogProfile}
          getBlog={getBlog}
          setCopyBlogDataHandler={setCopyBlogDataHandler}
          createNote={createNote}
          note={note}
          onChangeNoteHandler={onChangeNoteHandler}
          onChangeCommentHandler={onChangeCommentHandler}
          commentary={commentary}
          createCommentary={createCommentary}
          deleteNote={deleteNote}
        />
      </div>
    </Router>
  );
}

export default App;
