#src/app/routes/recipes.py
#レシピ取得エントリポイント
from flask import Blueprint, request, jsonify
from ..services.recipe_service import RecipeService

bp = Blueprint('recipes', __name__)
recipe_service = RecipeService()

@bp.route('/recipes', methods=['GET'])
def get_recipes():
    category_id = request.args.get('categoryId')
    
    if not category_id:
        return jsonify({"error": "カテゴリIDが指定されていません"}), 400

    recipes = recipe_service.get_recipes_by_category_id(category_id)
    if not recipes:
        return jsonify({"error": "レシピが見つかりませんでした"}), 404

    return jsonify(recipes)


