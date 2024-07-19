"use client";

import React from "react";
import Image from "next/image";
import { auth, provider } from "../lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import logger from "../lib/logger";

const Home = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      logger.log("Logged in user:", user);
      router.push("/recipes");
    } catch (error) {
      console.error("ログインできませんでした");
    }
  };

  return (
    <div className="text-center" style={{ backgroundColor: "white", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="w-[300px] mx-auto mt-16" style={{ marginBottom: "16px" }}>
        <Image
          src="/food_omisoshiru.png"
          alt="お味噌汁"
          width={300}
          height={200}
        />
      </div>
      <h1 className="text-3xl mb-12">今日のお味噌汁</h1>
      <button
        onClick={signInWithGoogle}
        className="px-5 py-2 border border-gray-700 text-lg rounded-xl flex items-center gap-2"
      >
        <Image
          src="/Unknown.jpeg"
          alt="Unknown"
          width={20}
          height={20}
          style={{ objectFit: 'cover' }}
        />
        Googleでログイン
      </button>
    </div>
  );
};

export default Home;
