import { useState } from "react";
import styles from "../app/notedetail/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/baseUrl";
const NoteDetail = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const newDate = `${day}/${month}/${year}`;

  let authItem = localStorage.getItem("auth");
  authItem = JSON.parse(authItem);
  let userId = authItem.user._id;
  console.log("userId -> ", userId);

  const addNote = async () => {
    let result = await fetch(`${BASE_URL}/api/notes`, {
      method: "POST",
      body: JSON.stringify({ title, description, newDate, userId }),
    });
    result = await result.json();
    if (result.success) {
      router.push("/", { scroll: false });
    }
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <button className={styles.backBtn}>Back</button>
        </Link>
        <button className={styles.saveBtn} onClick={addNote}>
          Save
        </button>
      </header>
      <div className={styles.popupB}>
        <div className={styles.popup}>
          <div className={styles.content}>
            <header>
              <p>Add a new Note</p>
              <img src="./notes.png" />
            </header>
            <form action="#">
              <div className="row title">
                <label>Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="row description">
                <label>Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
