"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BASE_URL } from "@/lib/baseUrl";
import styles from "./page.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // CREATING LOGIN USER FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    result = await result.json();
    if (result.success) {
      toast.success("User login Successfully");
      localStorage.setItem("auth", JSON.stringify(result));
      router.push("/", { scroll: false });
    } else {
      toast.error("error while register user");
    }
  };
  return (
    // <Layout title={"Register - Ecommerce App"}>
    <div className={styles.container}>
      <div className={styles.formBox}>
        <form className={styles.formItems} onSubmit={handleLogin}>
          <h1>LOGIN FORM</h1>
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
            <button type="submit">Login</button>
          </div>
          <div className={styles.formLink}>
            <div>
              <Link href={"/register"} className={styles.formLinkItems}>
                Signup
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    // </Layout>
  );
};

export default Login;
