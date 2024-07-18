# レシピ
from flask import Blueprint, request, jsonify
from app.models import Recipe
from app.config import Session

recipes_bp = Blueprint('recipes', __name__)

@recipes_bp.route('/', methods=['GET'])
def get_recipes():
    session = Session()
    recipes = session.query(Recipe).all()
    response = jsonify([recipe.as_dict() for recipe in recipes])
    session.close()
    return response

@recipes_bp.route('/<int:id>', methods=['GET'])
def get_recipe(id):
    session = Session()
    recipe = session.query(Recipe).get(id)
    if recipe is None:
        session.close()
        return jsonify({'error': 'Recipe not found'}), 404
    response = jsonify(recipe.as_dict())
    session.close()
    return response

@recipes_bp.route('/', methods=['POST'])
def create_recipe():
    session = Session()
    data = request.get_json()
    recipe = Recipe(**data)
    session.add(recipe)
    session.commit()
    response = jsonify(recipe.as_dict())
    session.close()
    return response, 201

@recipes_bp.route('/<int:id>', methods=['PUT'])
def update_recipe(id):
    session = Session()
    data = request.get_json()
    recipe = session.query(Recipe).get(id)
    if recipe is None:
        session.close()
        return jsonify({'error': 'Recipe not found'}), 404
    for key, value in data.items():
        setattr(recipe, key, value)
    session.commit()
    response = jsonify(recipe.as_dict())
    session.close()
    return response

@recipes_bp.route('/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    session = Session()
    recipe = session.query(Recipe).get(id)
    if recipe is None:
        session.close()
        return jsonify({'error': 'Recipe not found'}), 404
    session.delete(recipe)
    session.commit()
    session.close()
    return '', 204
