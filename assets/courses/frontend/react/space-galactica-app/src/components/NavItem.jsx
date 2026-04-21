import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export const NavItem = ({ title, link, isActive }) => {
  return (
    <li
      className={classNames(styles.navbarLinks, {
        [styles.isLinkActive]: isActive,
      })}
    >
      <Link to={link}>{title}</Link>
    </li>
  );
};

export default NavItem;
