import os
from dotenv import load_dotenv  
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask_sqlalchemy import SQLAlchemy

load_dotenv()  # この行を追加

# 環境変数からデータベースURLを取得
DATABASE_URL = os.getenv('DATABASE_URL')

# データベースエンジンの作成
engine = create_engine(DATABASE_URL)

# セッションの設定
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ベースクラスの作成
Base = declarative_base()

# SQLAlchemyのインスタンス
db = SQLAlchemy()

class Config:
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False