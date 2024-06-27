"use client";
import dynamic from "next/dynamic";
const NoteDetail = dynamic(() => import("@/components/NoteDetail"), {
  ssr: false,
});

const page = () => {
  return <NoteDetail />;
};

export default page;
