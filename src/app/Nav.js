import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const nav = () => {
  const router = useRouter();

  let authItem = localStorage.getItem("auth");
  authItem = JSON.parse(authItem);

  const userName = authItem?.user.name;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login", { scroll: false });
  };
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navContainer2}>
        <Link className={styles.userName} href="/">
          <img src="./notes.png" />
          NoteMe
        </Link>
        <div className={styles.navItems} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active userName"
                aria-current="page"
                href="#"
              >
                {userName.toUpperCase()}
              </a>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link" href="#">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default nav;
