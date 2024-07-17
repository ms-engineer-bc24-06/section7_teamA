#src/app/services/recipe_service.py
import requests

class RecipeService:
    def __init__(self):
        self.category_list_url = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426'
        self.ranking_url = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426'
        self.api_key = '1058177813617274368'  # 楽天APIキー

    def get_category_list(self):
        params = {
            'applicationId': self.api_key
        }
        response = requests.get(self.category_list_url, params=params)
        response.raise_for_status()
        return response.json()

    def get_recipes_by_category_id(self, category_id):
        params = {
            'applicationId': self.api_key,
            'categoryId': category_id,
            'format': 'json',
        }

        try:
            response = requests.get(self.ranking_url, params=params)
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

def main():
    service = RecipeService()
    
    # 親カテゴリとその子カテゴリを取得
    categories = service.get_category_list()
    parent_category_id = '17'
    
    for category in categories['result']['large']:
        if category['categoryId'] == parent_category_id:
            print(f"親カテゴリ: {category['categoryName']} (ID: {category['categoryId']})")
            for medium_category in category.get('medium', []):
                print(f"  中カテゴリ: {medium_category['categoryName']} (ID: {medium_category['categoryId']})")
                for small_category in medium_category.get('small', []):
                    print(f"    小カテゴリ: {small_category['categoryName']} (ID: {small_category['categoryId']})")

    # 子カテゴリ159のレシピを取得
    recipes = service.get_recipes_by_category_id('159')
    print(f"\nカテゴリID159のレシピ:")
    for recipe in recipes:
        print(f"タイトル: {recipe['title']}, 説明: {recipe['description']}")

if __name__ == "__main__":
    main()