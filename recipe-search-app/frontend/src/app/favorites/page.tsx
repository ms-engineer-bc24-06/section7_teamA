"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Recipe {
  id: number;
  season: string;
  title: string;
  description: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/favorites");
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl mt-10">お気に入りのレシピ</h1>
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
