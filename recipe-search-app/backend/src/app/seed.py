import os
import sys

# パスを設定
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import DATABASE_URL, Base
from app.models import Recipe


engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# 初期データの作成
recipes = [
    # 春のレシピ
    Recipe(
        season="春",
        title="スナップエンドウで春のお味噌汁",
        description="https://cookpad.com/recipe/5019205"
    ),
    Recipe(
        season="春",
        title="春キャベツと桜海老のお味噌汁",
        description="https://cookpad.com/recipe/2537077"
    ),
    Recipe(
        season="春",
        title="新玉ねぎと春キャベツの味噌汁",
        description="https://cookpad.com/recipe/7518395"
    ),
    Recipe(
        season="春",
        title="春キャベツとコーン 豆乳のお味噌汁",
        description="https://cookpad.com/recipe/1124551"
    ),
    # 夏のレシピ
    Recipe(
        season="夏",
        title="オクラと長芋の冷製味噌汁",
        description="https://cookpad.com/recipe/7840391"
    ),
    Recipe(
        season="夏",
        title="夏野菜のお味噌汁(なす、おくら)",
        description="https://cookpad.com/recipe/5757683"
    ),
    Recipe(
        season="夏",
        title="夏の定番 茗荷といもと油揚げの味噌汁",
        description="https://cookpad.com/recipe/1208839"
    ),
    Recipe(
        season="夏",
        title="夏に美味しい♪なすとピーマンの味噌汁",
        description="https://cookpad.com/recipe/2259832"
    ),
    # 秋のレシピ
    Recipe(
        season="秋",
        title="さつま芋ときのこで秋のお味噌汁",
        description="https://cookpad.com/recipe/6971343"
    ),
    Recipe(
        season="秋",
        title="簡単☆秋を感じる舞茸と茄子のお味噌汁",
        description="https://cookpad.com/recipe/2166945"
    ),
    Recipe(
        season="秋",
        title="豚肉と蓮根のお味噌汁",
        description="https://cookpad.com/recipe/1648661"
    ),
    Recipe(
        season="秋",
        title="秋の具沢山みそ汁♬",
        description="https://cookpad.com/recipe/2329238"
    ),
    # 冬のレシピ
    Recipe(
        season="冬",
        title="白菜と豚肉の味噌汁",
        description="https://cookpad.com/recipe/4928080"
    ),
    Recipe(
        season="冬",
        title="冬⭐大根と白菜と玉ねぎのお味噌汁",
        description="https://cookpad.com/recipe/2887693"
    ),
    Recipe(
        season="冬",
        title="冬☆絶品!金目鯛のあらde出し旨味噌汁♪",
        description="https://cookpad.com/recipe/2961591"
    ),
    Recipe(
        season="冬",
        title="冬☆旬♪コロころ香ばし白葱のお味噌汁",
        description="https://cookpad.com/recipe/2954482"
    )
]

# 初期データの追加
session.add_all(recipes)
session.commit()

print("データのシーディングが完了しました。")
