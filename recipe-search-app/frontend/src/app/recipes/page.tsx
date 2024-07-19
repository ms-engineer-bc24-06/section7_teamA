"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseConfig";
import axios from "axios";

interface Recipe {
  id: number;
  season: string;
  title: string;
  description: string;
  user_id?: string; // optional user_id field
}

export default function Recipes() {
  const [recipe, setRecipe] = useState<Recipe | null>(null); // レシピの状態を管理
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]); // 全レシピの状態を管理
  const [userId, setUserId] = useState<string | null>(null); // ユーザーIDの状態を管理
  const router = useRouter(); // ルーターを使用してページ遷移を管理

  // Firebase認証状態を監視し、未認証の場合はルートページにリダイレクト
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // ユーザーが認証されている場合、ユーザーIDを設定
      } else {
        router.push("/");
      }
    });
    return unsubscribe;
  }, [router]);

  // コンポーネントがマウントされたときにレシピデータを取得
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setAllRecipes(response.data);
      } catch (error) {
        console.error("エラーが起きました");
      }
    };

    fetchRecipes();
  }, []);

  // 季節ごとのランダムなレシピを取得して状態に設定
  const fetchRandomRecipeBySeason = (season: string) => {
    const filteredRecipes = allRecipes.filter(
      (recipe) => recipe.season === season
    );
    const randomRecipe =
      filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
    setRecipe(randomRecipe);
  };

  // レシピをお気に入りに追加する
  const addToFavorites = async (recipe: Recipe) => {
    if (userId) {
      try {
        const recipeWithUserId = { ...recipe, user_id: userId };
        await axios.post("http://localhost:5000/favorites/", recipeWithUserId);
        alert(`${recipe.title}をお気に入りに追加しました！`);
      } catch (error) {
        console.error("エラーが起きました");
      }
    } else {
      alert("ユーザーが認証されていません");
    }
  };

  // サインアウトしてルートページにリダイレクト
  const signOut = () => {
    auth.signOut().then(() => {
      router.push("/");
    });
  };

  return (
    <div className="text-center">
      {/* サインアウトボタン */}
      <button onClick={signOut} className="absolute top-2 right-2 text-base">
        ログアウト
      </button>
      {/* 味噌汁の画像 */}
      <img
        src="/food_omisoshiru.png"
        alt="Miso Soup"
        className="w-[300px] mx-auto mt-16"
      />
      {/* 季節ごとのレシピを取得するボタン */}
      <div>
        <button
          onClick={() => fetchRandomRecipeBySeason("春")}
          className="mt-5 mr-3 px-5 py-2 border border-gray-700 text-xl rounded-xl"
        >
          春
        </button>
        <button
          onClick={() => fetchRandomRecipeBySeason("夏")}
          className="mt-5 mr-3 px-5 py-2 border border-gray-700 text-xl rounded-xl"
        >
          夏
        </button>
        <button
          onClick={() => fetchRandomRecipeBySeason("秋")}
          className="mt-5 mr-3 px-5 py-2 border border-gray-700 text-xl rounded-xl"
        >
          秋
        </button>
        <button
          onClick={() => fetchRandomRecipeBySeason("冬")}
          className="mt-5 px-5 py-2 border border-gray-700 text-xl rounded-xl"
        >
          冬
        </button>
      </div>
      {/* お気に入りページへのリンクボタン */}
      <div>
        <button
          onClick={() => router.push("/favorites")}
          className="mt-6 mb-3 px-5 py-2 text-lg "
        >
          お気に入りを見る
        </button>
      </div>
      {/* 選択されたレシピの表示 */}
      {recipe && (
        <div className="mt-10">
          <h2 className="text-3xl mb-2">{recipe.title}</h2>
          <a
            href={recipe.description}
            target="_blank"
            className="mt-12 text-gray-500 underline text-xl"
          >
            レシピを見る
          </a>
          <div>
            <button
              onClick={() => addToFavorites(recipe)}
              className="mt-11 px-5 py-2 border border-gray-700 text-lg rounded-full"
            >
              お気に入りに追加
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
