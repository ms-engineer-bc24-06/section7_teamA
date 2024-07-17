# Flaskアプリケーションの初期化コード

from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from .routes import recipes
    app.register_blueprint(recipes.bp)
    
    return app

