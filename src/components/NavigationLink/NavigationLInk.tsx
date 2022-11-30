import React from "react";
import style from "./NavigationLink.module.css";
import { Link } from "react-router-dom";
import { IBlog } from "../../interface/global";

interface NavigationLInkProps {
  blog: IBlog;
  closeDropMenu: React.MouseEventHandler;
}

const NavigationLInk: React.FC<NavigationLInkProps> = ({
  blog,
  closeDropMenu,
}) => {
  return (
    <li className={style.drop_down_menu_element}>
      <Link
        onClick={closeDropMenu}
        className={style.drop_down_menu_element_link}
        to={`/${blog.nameOfBlog}`}
      >
        {blog.nameOfBlog}
      </Link>
    </li>
  );
};

export default NavigationLInk;
