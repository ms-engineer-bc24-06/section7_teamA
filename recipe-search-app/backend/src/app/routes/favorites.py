# お気に入りエンドポイント
from flask import Blueprint, request, jsonify
from app.models import Favorite
from app.config import Session

favorites_bp = Blueprint('favorites', __name__, url_prefix='/favorites')

@favorites_bp.route('/', methods=['GET'])
def get_favorites():
    session = Session()
    try:
        favorites = session.query(Favorite).all()
        response = jsonify([favorite.as_dict() for favorite in favorites])
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@favorites_bp.route('/<int:id>', methods=['GET'])
def get_favorite(id):
    session = Session()
    try:
        favorite = session.query(Favorite).get(id)
        if favorite is None:
            return jsonify({'error': 'Favorite not found'}), 404
        response = jsonify(favorite.as_dict())
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@favorites_bp.route('/', methods=['POST'])
def create_favorite():
    session = Session()
    try:
        data = request.get_json()
        favorite = Favorite(**data)
        session.add(favorite)
        session.commit()
        response = jsonify(favorite.as_dict())
        return response, 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@favorites_bp.route('/<int:id>', methods=['PUT'])
def update_favorite(id):
    session = Session()
    try:
        data = request.get_json()
        favorite = session.query(Favorite).get(id)
        if favorite is None:
            return jsonify({'error': 'Favorite not found'}), 404
        for key, value in data.items():
            setattr(favorite, key, value)
        session.commit()
        response = jsonify(favorite.as_dict())
        return response
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@favorites_bp.route('/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    session = Session()
    try:
        favorite = session.query(Favorite).get(id)
        if favorite is None:
            return jsonify({'error': 'Favorite not found'}), 404
        session.delete(favorite)
        session.commit()
        return '', 204
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()