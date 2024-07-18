"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebaseConfig";

interface Recipe {
  id: number;
  season: string;
  title: string;
  description: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter(); // useRouterフックを使用してルーティングを管理

  // ユーザーのUIDを取得
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // 認証されたユーザーのUIDを設定
      } else {
        setUserId(null); // ユーザーが認証されていない場合はnullを設定
      }
    });
    return unsubscribe;
  }, []);

  // UIDに基づいてお気に入りレシピを取得
  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/favorites?user_id=${userId}`
          );
          setFavorites(response.data);
        } catch (error) {
          console.error("エラーが起きました");
        }
      };

      fetchFavorites();
    }
  }, [userId]);

  return (
    <div className="text-center">
      <h1 className="text-3xl mt-10">お気に入りのレシピ</h1>
      <button
        onClick={() => router.back()}
        className="mt-5 px-5 py-2 border-2 border-black text-xl"
      >
        戻る
      </button>
      {favorites.length === 0 ? (
        <p className="mt-5">お気に入りレシピがありません。</p>
      ) : (
        <div className="mt-10">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="mb-5">
              <h2 className="text-2xl">{recipe.title}</h2>
              <a
                href={recipe.description}
                target="_blank"
                className="mt-2 text-blue-500 underline"
              >
                レシピを見る
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
