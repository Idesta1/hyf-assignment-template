import { useLocation, Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const SocialMediaItem = ({ url, title, icon }) => {
  return (
    <li className={styles.footerListItem}>
      <a href={url} title={title}>
        <img src={icon} alt={title} />
      </a>
    </li>
  );
};

export default SocialMediaItem;
