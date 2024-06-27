"use client";

import { BASE_URL } from "@/lib/baseUrl";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // CREATING REGISTER USER FUNCTION
  const addUser = async (e) => {
    e.preventDefault();
    let result = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    result = await result.json();
    if (result.success) {
      toast.success("User Registered Successfully");
      router.push("/login", { scroll: false });
    } else {
      toast.error("error while register user");
    }
  };

  return (
    // <Layout title={"Register - Ecommerce App"}>
    <div className={styles.container}>
      <div className={styles.formBox}>
        <form className={styles.formItems} onSubmit={addUser}>
          <h1>REGISTER FORM</h1>
          <div className={styles.inputBx}>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              id="exampleInputName1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className={styles.inputBx}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className={styles.inputBx}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              id="exampleInputPassword1"
            />
          </div>
          <div className={styles.inputBx}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className={styles.formLink}>
            <Link href={"/login"} className={styles.formLinkItems}>
              Already a user
            </Link>
          </div>
        </form>
      </div>
    </div>
    // </Layout>
  );
};

export default RegisterPage;
