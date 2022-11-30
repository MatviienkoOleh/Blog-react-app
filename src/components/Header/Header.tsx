import React, { useState } from "react";
import style from "./Header.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { IBlog, IBlogInfo } from "../../interface/global";
import NavigationLInk from "../NavigationLink/NavigationLInk";
import HeaderForm from "../HeaderForm/HeaderForm";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  auth: any;
  provider: any;
  createBlog: Function;
  onChangeHandler: React.ChangeEventHandler;
  blogInfo: IBlogInfo;
  blogs: IBlog[];
}

const Header: React.FC<HeaderProps> = ({
  auth,
  provider,
  createBlog,
  onChangeHandler,
  blogInfo,
  blogs,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isCreateMenuVisible, setIsCreateMenuVisible] =
    useState<boolean>(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const login: React.MouseEventHandler = async () => {
    const { user } = await auth.signInWithPopup(provider);
  };
  const openDropDownMenu: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsVisible(!isVisible);
    setIsCreateMenuVisible(false);
  };
  const closeDropMenu: React.MouseEventHandler<HTMLElement> = () => {
    setIsVisible(false);
  };
  const openCreateBlogMenu: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (user) {
      setIsVisible(false);
      setIsCreateMenuVisible(!isCreateMenuVisible);
    } else {
      alert("Авторизуйтеся");
    }
  };
  const createBlogWrapper: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    createBlog();
    navigate(`/${blogInfo.nameOfBlog}`)
    setIsCreateMenuVisible(false);
  };

  return (
    <header className={style.header_wrapper}>
      <div className={style.manually_menu}>
        <button
          className={style.header_button}
          style={isVisible ? { borderRadius: "5px 5px 0px 0px" } : {}}
          onClick={openDropDownMenu}
        >
          Усі розділи
        </button>
        <button
          className={style.header_button}
          style={isCreateMenuVisible ? { borderRadius: "5px 5px 0px 0px" } : {}}
          onClick={openCreateBlogMenu}
        >
          Створити блог
        </button>
      </div>
      <ul
        className={style.drop_down_menu}
        style={isVisible ? { display: "block" } : { display: "none" }}
      >
        {blogs
          ? blogs.map((blog) => {
              return (
                <NavigationLInk
                  closeDropMenu={closeDropMenu}
                  key={blog.id}
                  blog={blog}
                />
              );
            })
          : null}
      </ul>
      <div
        style={
          isCreateMenuVisible && user
            ? { display: "flex", position: "absolute" }
            : { display: "none" }
        }
      >
        <HeaderForm
          onChangeHandler={onChangeHandler}
          blogInfo={blogInfo}
          createBlogWrapper={createBlogWrapper}
        />
      </div>
      <h1 className={style.header_text}>
        Створіть свій блог, та поділіться з іншими
      </h1>
      {user ? (
        <button className={style.header_button} onClick={() => auth.signOut()}>
          Вийти
        </button>
      ) : (
        <button className={style.header_button} onClick={login}>
          Авторизація
        </button>
      )}
    </header>
  );
};

export default Header;
