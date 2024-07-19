import os
import logging
from dotenv import load_dotenv

# .env ファイルから環境変数を読み込む
load_dotenv()

# 環境変数からログレベルを取得（デフォルトは 'INFO'）
log_level = os.getenv('LOG_LEVEL', 'INFO').upper()

# ログ設定
logging.basicConfig(
    level=log_level,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('logfile.log')
    ]
)
logger = logging.getLogger('app')
logger.setLevel(log_level)

