// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "../../../firebaseConfig";
// import axios from "axios";

// interface Recipe {
//   id: number;
//   season: string;
//   title: string;
//   description: string;
// }

// const allRecipes: Recipe[] = [
//   {
//     id: 1,
//     season: "春",
//     title: "ある物でササっと☆我が家のスピード味噌汁",
//     description: "https://cookpad.com/recipe/3927860",
//   },
//   {
//     id: 2,
//     season: "夏",
//     title: "揚げなすとマイタケの味噌汁",
//     description: "https://cookpad.com/recipe/7879124",
//   },
//   {
//     id: 3,
//     season: "秋",
//     title: "さといものみそ汁",
//     description: "https://cookpad.com/recipe/7672844",
//   },
//   {
//     id: 4,
//     season: "冬",
//     title: "【冬にあたたか】豆乳みそ汁",
//     description: "https://cookpad.com/recipe/7442493",
//   },
//   {
//     id: 5,
//     season: "冬",
//     title: "味噌汁⑤冬の豚汁",
//     description: "https://cookpad.com/recipe/7439277",
//   },
//   {
//     id: 6,
//     season: "冬",
//     title: "冬に食べたいサバ缶味噌汁",
//     description: "https://cookpad.com/recipe/7410909",
//   },
//   {
//     id: 7,
//     season: "冬",
//     title: "【冬の定番】かぶらの味噌汁",
//     description: "https://cookpad.com/recipe/7371422",
//   },
// ];

// export default function Recipes() {
//   const [recipe, setRecipe] = useState<Recipe | null>(null); // レシピの状態を管理
//   const router = useRouter(); // ルーターを使用してページ遷移を管理

//   // Firebase認証状態を監視し、未認証の場合はルートページにリダイレクト
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (!user) {
//         router.push("/");
//       }
//     });
//     return unsubscribe;
//   }, [router]);

//   // 季節ごとのランダムなレシピを取得して状態に設定
//   const fetchRandomRecipeBySeason = (season: string) => {
//     const filteredRecipes = allRecipes.filter(
//       (recipe) => recipe.season === season
//     );
//     const randomRecipe =
//       filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
//     setRecipe(randomRecipe);
//   };

//   // レシピをお気に入りに追加する
//   const addToFavorites = async (recipe: Recipe) => {
//     try {
//       await axios.post("http://localhost:5000/favorites", recipe);
//       alert(`${recipe.title}をお気に入りに追加しました！`);
//     } catch (error) {
//       console.error("エラーが起きました");
//     }
//   };

//   // サインアウトしてルートページにリダイレクト
//   const signOut = () => {
//     auth.signOut().then(() => {
//       router.push("/");
//     });
//   };

//   return (
//     <div className="text-center">
//       {/* サインアウトボタン */}
//       <button onClick={signOut} className="absolute top-2 right-2">
//         Sign out
//       </button>
//       {/* 味噌汁の画像 */}
//       <img
//         src="/food_omisoshiru.png"
//         alt="Miso Soup"
//         className="w-[300px] mx-auto mt-10"
//       />
//       {/* 季節ごとのレシピを取得するボタン */}
//       <div>
//         <button
//           onClick={() => fetchRandomRecipeBySeason("春")}
//           className="mt-5 mr-3 px-5 py-2 border-2 border-black text-xl"
//         >
//           春
//         </button>
//         <button
//           onClick={() => fetchRandomRecipeBySeason("夏")}
//           className="mt-5 mr-3 px-5 py-2 border-2 border-black text-xl"
//         >
//           夏
//         </button>
//         <button
//           onClick={() => fetchRandomRecipeBySeason("秋")}
//           className="mt-5 mr-3 px-5 py-2 border-2 border-black text-xl"
//         >
//           秋
//         </button>
//         <button
//           onClick={() => fetchRandomRecipeBySeason("冬")}
//           className="mt-5 px-5 py-2 border-2 border-black text-xl"
//         >
//           冬
//         </button>
//       </div>
//       {/* お気に入りページへのリンクボタン */}
//       <div>
//         <button
//           onClick={() => router.push("/favorites")}
//           className="mt-5 px-5 py-2 border-2 border-black text-xl"
//         >
//           お気に入りを見る
//         </button>
//       </div>
//       {/* 選択されたレシピの表示 */}
//       {recipe && (
//         <div className="mt-10">
//           <h2 className="text-2xl">{recipe.title}</h2>
//           <a
//             href={recipe.description}
//             target="_blank"
//             className="mt-2 text-blue-500 underline"
//           >
//             レシピを見る
//           </a>
//           <div>
//             <button
//               onClick={() => addToFavorites(recipe)}
//               className="mt-3 px-5 py-2 border-2 border-black text-xl"
//             >
//               お気に入りに追加
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "../../../firebaseConfig";
// import axios from "axios";

// interface Recipe {
//   id: number;
//   season: string;
//   title: string;
//   description: string;
// }

// export default function Recipes() {
//   const [recipe, setRecipe] = useState<Recipe | null>(null); // レシピの状態を管理
//   const [allRecipes, setAllRecipes] = useState<Recipe[]>([]); // 全レシピの状態を管理
//   const router = useRouter(); // ルーターを使用してページ遷移を管理

//   // Firebase認証状態を監視し、未認証の場合はルートページにリダイレクト
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (!user) {
//         router.push("/");
//       }
//     });
//     return unsubscribe;
//   }, [router]);

//   // コンポーネントがマウントされたときにレシピデータを取得
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/recipes");
//         setAllRecipes(response.data);
//       } catch (error) {
//         console.error("エラーが起きました");
//       }
//     };

//     fetchRecipes();
//   }, []);

//   // 季節ごとのランダムなレシピを取得して状態に設定
//   const fetchRandomRecipeBySeason = (season: string) => {
//     const filteredRecipes = allRecipes.filter(
//       (recipe) => recipe.season === season
//     );
//     const randomRecipe =
//       filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
//     setRecipe(randomRecipe);
//   };

//   // レシピをお気に入りに追加する
//   const addToFavorites = async (recipe: Recipe) => {
//     try {
//       await axios.post("http://localhost:5000/favorites", recipe);
//       alert(`${recipe.title}をお気に入りに追加しました！`);
//     } catch (error) {
//       console.error("エラーが起きました");
//     }
//   };

//   // サインアウトしてルートページにリダイレクト
//   const signOut = () => {
//     auth.signOut().then(() => {
//       router.push("/");
//     });
//   };

//   return (
//     <div className="text-center">
//       {/* サインアウトボタン */}
//       <button onClick={signOut} className="absolute top-2 right-2">
//         Sign out
//       </button>
//       {/* 味噌汁の画像 */}
//       <img
//         src="/food_omisoshiru.png"
//         alt="Miso Soup"
//         className="w-[300px] mx-auto mt-10"
//       />
//       {/* 季節ごとのレシピを取得するボタン */}
//       <div>
//         <button
//           onClick={() => fetchRandomRecipeBySeason("春")}
//           className="mt-5 mr-3 px-5 py-2 border-2 border-black text-xl"
//         >
//           春
//         </button>
//         <button
//           onClick={() => fetchRandomRecipeBySeason("夏")}
//           className="mt-5 mr-3 px-5 py-2 border-2 border-black text-xl"
//         >
//           夏
//         </button>
//         <button
//           onClick={() => fetchRandomRecipeBySeason("秋")}
//           className="mt-5 mr-3 px-5 py-2 border-2 border-black text-xl"
//         >
//           秋
//         </button>
//         <button
//           onClick={() => fetchRandomRecipeBySeason("冬")}
//           className="mt-5 px-5 py-2 border-2 border-black text-xl"
//         >
//           冬
//         </button>
//       </div>
//       {/* お気に入りページへのリンクボタン */}
//       <div>
//         <button
//           onClick={() => router.push("/favorites")}
//           className="mt-5 px-5 py-2 border-2 border-black text-xl"
//         >
//           お気に入りを見る
//         </button>
//       </div>
//       {/* 選択されたレシピの表示 */}
//       {recipe && (
//         <div className="mt-10">
//           <h2 className="text-2xl">{recipe.title}</h2>
//           <a
//             href={recipe.description}
//             target="_blank"
//             className="mt-2 text-blue-500 underline"
//           >
//             レシピを見る
//           </a>
//           <div>
//             <button
//               onClick={() => addToFavorites(recipe)}
//               className="mt-3 px-5 py-2 border-2 border-black text-xl"
//             >
//               お気に入りに追加
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebaseConfig";
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
        await axios.post("http://localhost:5000/favorites", recipeWithUserId);
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
      <button onClick={signOut} className="absolute top-2 right-2">
        Sign out
      </button>
      {/* 味噌汁の画像 */}
      <img
        src="/food_omisoshiru.png"
        alt="Miso Soup"
        className="w-[300px] mx-auto mt-10"
      />
      {/* 季節ごとのレシピを取得するボタン */}
      <div>
        <button
          onClick={() => fetchRandomRecipeBySeason("春")}
          className="mt-5 mr-3 px-5 py-2 border-2 border-black text-xl"
        >
          春
        </button>
        <button
          onClick={() => fetchRandomRecipeBySeason("夏")}
          className="mt-5 mr-3 px-5 py-2 border-2 border-black text-xl"
        >
          夏
        </button>
        <button
          onClick={() => fetchRandomRecipeBySeason("秋")}
          className="mt-5 mr-3 px-5 py-2 border-2 border-black text-xl"
        >
          秋
        </button>
        <button
          onClick={() => fetchRandomRecipeBySeason("冬")}
          className="mt-5 px-5 py-2 border-2 border-black text-xl"
        >
          冬
        </button>
      </div>
      {/* お気に入りページへのリンクボタン */}
      <div>
        <button
          onClick={() => router.push("/favorites")}
          className="mt-10 px-5 py-2 border-2 border-black text-xl"
        >
          お気に入りを見る
        </button>
      </div>
      {/* 選択されたレシピの表示 */}
      {recipe && (
        <div className="mt-10">
          <h2 className="text-2xl">{recipe.title}</h2>
          <a
            href={recipe.description}
            target="_blank"
            className="mt-2 text-blue-500 underline"
          >
            レシピを見る
          </a>
          <div>
            <button
              onClick={() => addToFavorites(recipe)}
              className="mt-3 px-5 py-2 border-2 border-black text-xl"
            >
              お気に入りに追加
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
