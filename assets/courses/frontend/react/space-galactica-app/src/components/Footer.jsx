import { useLocation, Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer className={pathname !== "/" ? styles.footer : styles.hidden}>
      <div className={styles.footerDescription}>
        <h3>Galactica</h3>
        <p>
          Explore the universe and beyond. Your journey to the stars starts
          here.
        </p>
        <p>&copy; 2026 Galactica. All rights reserved.</p>
      </div>
      <div className={styles.pages}>
        <h3>Pages</h3>
        <ul>
          <li>
            <Link to="/about_us">About Us</Link>
          </li>
          <li>
            <Link to="/destination">Destination</Link>
          </li>
          <li>
            <Link to="/nasa_collaboration">NASA Collaboration</Link>
          </li>
        </ul>
      </div>
      {/*Docs for the Link: https://reactrouter.com/api/components/Link#link.*/}
      <div className={styles.footerLinks}>
        <h3>Follow us</h3>
        <ul className={styles.footerList}>
          <li>
            <a href="https://facebook.com">Facebook</a>
          </li>
          <li>
            <a href="https://instagram.com">Instagram</a>
          </li>
          <li>
            <a href="https://tiktok.com">Tiktok</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/feed/">LinkedIn</a>
          </li>
          {/* 🧑🏽‍🚀 Task - Week 2 */}
          {/* Create a <SocialMediaItem /> component and replace all of the list items! */}
          {/* SocialMediaItem should accept the following props: url, title, icon. */}
          {/* For the icons, you can download 1-2 social media icons for testing and put it in the /public/socialmedia/ folder. */}
        </ul>
      </div>
    </footer>
  );
};
