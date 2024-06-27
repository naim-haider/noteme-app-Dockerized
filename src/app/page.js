"use client";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
const Notes = dynamic(() => import("@/components/Note"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <Notes />
    </main>
  );
}
