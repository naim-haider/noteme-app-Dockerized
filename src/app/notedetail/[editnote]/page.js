"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/baseUrl";

const Page = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    getNoteDetail();
  }, []);

  const getNoteDetail = async () => {
    let noteId = props.params.editnote;
    let noteData = await fetch(`${BASE_URL}/api/notes/${noteId}`);
    noteData = await noteData.json();
    if (noteData.success) {
      let result = noteData.result;
      setTitle(result.title);
      setDescription(result.description);
    }
  };

  const updateNote = async () => {
    let noteId = props.params.editnote;
    let data = await fetch(`${BASE_URL}/api/notes/${noteId}`, {
      method: "PUT",
      body: JSON.stringify({ title, description }),
    });
    data = await data.json();
    if (data.result) {
      router.push("/");
    }
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <button className={styles.backBtn}>Back</button>
        </Link>
        <button className={styles.saveBtn} onClick={updateNote}>
          Update
        </button>
      </header>
      <div className={styles.popupB}>
        <div className={styles.popup}>
          <div className={styles.content}>
            <header>
              <p>Update the Note</p>
              <img src="../notes.png" />
            </header>
            <form action="#">
              <div className="row title">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="row description">
                <label>Description</label>
                <textarea
                  value={description}
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

export default Page;
