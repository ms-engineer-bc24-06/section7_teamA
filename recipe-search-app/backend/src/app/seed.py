from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import DATABASE_URL, Base
from app.models import Recipe

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# 初期データの追加
recipe = Recipe(
    season="春",
    title="ある物でササっと☆我が家のスピード味噌汁",
    description="https://cookpad.com/recipe/3927860"
)
session.add(recipe)
session.commit()

print("データのシーディングが完了しました。")
