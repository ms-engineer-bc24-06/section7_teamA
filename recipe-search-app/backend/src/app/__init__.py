# Flaskアプリケーションの初期化コード


from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config.from_object('src.app.config.Config')

    db.init_app(app)

    from src.app.routes.recipes import bp as recipes_bp
    app.register_blueprint(recipes_bp, url_prefix='/recipes')

    return app
