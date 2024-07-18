import sys
import os
from flask import Flask, send_from_directory, render_template
from flask_cors import CORS

# プロジェクトのルートディレクトリを `sys.path` に追加
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import Config, db
from app.routes.recipes import recipes_bp
from app.routes.favorites import favorites_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)
    
    @app.route('/')
    def hello():
        return render_template('index.html')
    
    @app.route('/favicon.ico')
    def favicon():
        return send_from_directory(app.static_folder, 'favicon.ico')

    app.register_blueprint(recipes_bp, url_prefix='/recipes')
    app.register_blueprint(favorites_bp, url_prefix='/favorites')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)