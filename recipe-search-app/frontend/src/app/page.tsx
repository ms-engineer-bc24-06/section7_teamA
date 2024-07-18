"use client";

import React from "react";
import Image from "next/image";
import { auth, provider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in user:", user);
      // ログイン成功後に /recipes ページにリダイレクト
      router.push("/recipes");
    } catch (error) {
      console.error("ログインできませんでした");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 中央寄せ
        paddingTop: "50px", // 上部に50pxの余白
      }}
    >
      <div
        style={{
          margin: "auto",
          maxWidth: "300px",
        }}
      >
        <Image
          src="/food_omisoshiru.png"
          alt="お味噌汁"
          width={300}
          height={200}
        />
      </div>
      <h1 style={{ fontSize: "36px", marginBottom: "300px" }}>
        今日のお味噌汁アプリ
      </h1>
      {/* ボタンの仮設置 */}
      <button
        style={{
          padding: "10px 20px",
          borderStyle: "solid",
          borderColor: "black",
          borderWidth: "2px",
          fontSize: "20px",
          marginTop: "-50px",
        }}
        onClick={signInWithGoogle} // ボタンクリックでGoogle認証を開始
      >
        Login with Google
      </button>
    </div>
  );
};

export default Home;