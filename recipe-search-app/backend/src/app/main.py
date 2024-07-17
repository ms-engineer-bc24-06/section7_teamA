
#app初期化、
# src/app/main.py
import sys
import os

# Flaskがインストールされているディレクトリをモジュール検索パスに追加
sys.path.append("C:/Users/km315/OneDrive/デスクトップ/section7_2406/section7_teamA/recipe-search-app/backend/venv/Lib/site-packages")

# 'src' ディレクトリをPythonのモジュール検索パスに追加
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from flask import Flask
from src.app.routes.recipes import bp as recipes_bp

app = Flask(__name__)
app.register_blueprint(recipes_bp, url_prefix='/recipes')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)