#src/app/services/recipe_service.py
"""
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
"""

import requests
import os

class RecipeService:
    def __init__(self):
        self.category_list_url = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426'
        self.recipe_search_url = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426'
        self.api_key = os.getenv('RAKUTEN_RECIPE_API_KEY')  # 環境変数からAPIキーを取得する

    def get_category_id(self, category_name):
        params = {
            'applicationId': self.api_key,
            'format': 'json',
        }

        try:
            response = requests.get(self.category_list_url, params=params)
            response.raise_for_status()
            data = response.json()

            # デバッグ用にレスポンスデータを出力
            print("APIレスポンスデータ (Category List):", data)

            if 'result' in data and 'large' in data['result']:
                categories = data['result']['large']
                for category in categories:
                    if category['categoryName'] == category_name:
                        return category['categoryId']
                print(f"'{category_name}' カテゴリーが見つかりませんでした。")
                return None
            else:
                print("No 'result' key in the category list response data.")
                return None

        except requests.exceptions.RequestException as e:
            print(f"カテゴリー一覧の取得中にエラーが発生しました: {e}")
            return None

        except Exception as e:
            print(f"予期しないエラーが発生しました: {e}")
            return None

    def get_recipes_by_category_id(self, category_id):
        params = {
            'applicationId': self.api_key,
            'categoryId': category_id,
            'format': 'json',
        }

        try:
            response = requests.get(self.recipe_search_url, params=params)
            response.raise_for_status()
            data = response.json()

            # デバッグ用にレスポンスデータを出力
            print("APIレスポンスデータ (Recipes):", data)

            if 'result' in data:
                recipes = data['result']
                return [{
                    'title': recipe['recipeTitle'],
                    'description': recipe.get('recipeDescription', '説明なし'),
                    'materials': recipe['recipeMaterial'],
                } for recipe in recipes]
            else:
                print("No 'result' key in the recipe response data.")
                return []

        except requests.exceptions.RequestException as e:
            print(f"レシピの取得中にエラーが発生しました: {e}")
            return []

        except Exception as e:
            print(f"予期しないエラーが発生しました: {e}")
            return []

# 環境変数の設定例（必要に応じて実行する）
# os.environ['RAKUTEN_RECIPE_API_KEY'] = 'あなたのAPIキー'

# 使用例
service = RecipeService()
miso_soup_category_id = service.get_category_id('味噌汁')
if miso_soup_category_id:
    miso_soup_recipes = service.get_recipes_by_category_id(miso_soup_category_id)
    for recipe in miso_soup_recipes:
        print("タイトル:", recipe['title'])
        print("説明:", recipe['description'])
        print("材料:", ", ".join(recipe['materials']))
        print()

