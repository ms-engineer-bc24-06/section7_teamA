#src/app/services/recipe_service.py
import requests

class RecipeService:
    def __init__(self):
        self.category_list_url = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426'
        self.api_key = '1058177813617274368'  # 楽天レシピAPIのキー

   
    def get_recipes_by_category_id(self, category_id):
        params = {
            'applicationId': self.api_key,
            'categoryId': category_id,
            'format': 'json',
        }

        try:
            response = requests.get(self.category_list_url, params=params)
            response.raise_for_status()
            data = response.json()

            # デバッグ用にレスポンスデータを出力
            print("APIレスポンスデータ:", data)

            if 'result' in data:
                recipes = data['result']
                return [{
                    'title': recipe['recipeTitle'],
                    'description': recipe.get('recipeDescription', '説明なし'),
                    'materials': recipe['recipeMaterial'],
                } for recipe in recipes]
            else:
                print("No 'result' key in the response data.")
                return []

        except requests.exceptions.RequestException as e:
            print(f"レシピの取得中にエラーが発生しました: {e}")
            return []

        except Exception as e:
            print(f"予期しないエラーが発生しました: {e}")
            return []