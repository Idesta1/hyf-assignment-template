import { useLocation, Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { SocialMediaItem } from "./SocialMediaItem";
import { pageLinks } from "./pageLinks";

const socialMedialItems = [
  {
    id: 1,
    title: "Facebook",
    url: "https://facebook.com",
    icon: "/socialmedia/facebook.png",
  },
  {
    id: 2,
    title: "Instagram",
    url: "https://instagram.com",
    icon: "/socialmedia/instagram.png",
  },
  {
    id: 3,
    title: "Tiktok",
    url: "https://tiktok.com",
    icon: "/socialmedia/tiktok.png",
  },
  {
    id: 4,
    title: "LinkedIn",
    url: "https://www.linkedin.com/feed/",
    icon: "/socialmedia/linkedin.png",
  },
];

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
          {pageLinks.map((item) => (
            <li key={item.link}>
              <Link to={item.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/*Docs for the Link: https://reactrouter.com/api/components/Link#link.*/}
      <div className={styles.footerLinks}>
        <h3>Follow us</h3>
        <ul className={styles.footerList}>
          {socialMedialItems.map((item) => (
            <SocialMediaItem
              key={item.id}
              title={item.title}
              url={item.url}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>
    </footer>
  );
};
