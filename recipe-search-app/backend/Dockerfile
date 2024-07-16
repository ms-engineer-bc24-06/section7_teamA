
# ベースイメージの指定
FROM python:3.8-slim

# 作業ディレクトリの設定
WORKDIR /app

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 依存関係ファイルのコピーとインストール
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションソースコードのコピー
COPY . .

# Flask環境変数の設定
ENV FLASK_APP=src/app/main.py
ENV FLASK_RUN_HOST=0.0.0.0

# 3000番ポートでリッスン
EXPOSE 5000

# アプリケーションの実行
CMD ["flask", "run"]

