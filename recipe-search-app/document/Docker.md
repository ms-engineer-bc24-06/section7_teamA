## Dockerセットアップ

### `docker-compose.yml`

```yaml

services:
  frontend:
    build:
      context: ./frontend
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
    volumes:
      - ./frontend:/app
    command: npm run dev

  backend:
    build:
      context: ./backend
    ports:
      - '5000:5000'
    environment:
      - FLASK_ENV=development
      - DATABASE_URL=mysql://user:password@db:3306/mydatabase
    volumes:
      - ./backend:/app
    command: flask run --host=0.0.0.0 --port=5000
    depends_on:
      - db
    networks:
      - shared-network

  db:
    image: mysql:8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - mysqldata:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - shared-network

volumes:
  mysqldata:

networks:
  shared-network:
    driver: bridge

```

### `backend` の `Dockerfile`

```

# ベースイメージの指定
FROM python:3.8-slim

# 作業ディレクトリの設定
WORKDIR /app

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# 依存関係ファイルのコピーとインストール
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションソースコードのコピー
COPY . .

# Flask環境変数の設定
ENV FLASK_APP=src/app/main.py
ENV FLASK_RUN_HOST=0.0.0.0

# 5000番ポートでリッスン
EXPOSE 5000

# アプリケーションの実行
CMD ["flask", "run", "--port=5000"]

```

### `frontend/Dockerfile`

```

# ベースイメージの指定
FROM node:lts

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係ファイルのコピーとインストール
COPY package.json package-lock.json ./
RUN npm install

# アプリケーションソースコードのコピー
COPY . .

# 3000番ポートでリッスン
EXPOSE 3000

# アプリケーションの実行
CMD ["npm", "run", "dev"]

```

 `requirements.txt` ファイルの作成

### `backend/requirements.txt`

```
plaintextコードをコピーする
Flask
Flask-CORS
requests

```

### 説明

### `docker-compose.yml`

- **frontend**:
    - `build`: `./frontend` ディレクトリをコンテキストとして使用。
    - `ports`: ローカルホストのポート3000をコンテナのポート3000にマッピング。
    - `volumes`: ホストの `./frontend` をコンテナの `/app` にマウント。
    - `command`: 開発サーバーを起動。
- **backend**:
    - `build`: `./backend` ディレクトリをコンテキストとして使用。
    - `ports`: ローカルホストのポート5000をコンテナのポート5000にマッピング。
    - `volumes`: ホストの `./backend` をコンテナの `/app` にマウント。
    - `command`: Flaskサーバーを起動。
    - `depends_on`: `db` サービスの起動を待機。
- **db**:
    - `image`: MySQLの公式イメージを使用。
    - `environment`: 環境変数でデータベースの設定を指定。
    - `ports`: ローカルホストのポート3306をコンテナのポート3306にマッピング。
    - `volumes`: ホストの `db_data` ボリュームをコンテナの `/var/lib/mysql` にマウント。

### `backend` の `Dockerfile`

- **FROM python:3.8-slim**: ベースイメージとしてPython 3.8のスリム版を使用。
- **WORKDIR /app**: 作業ディレクトリを `/app` に設定。
- **RUN apt-get update && apt-get install -y build-essential**: 必要なビルドツールをインストール。
- **COPY requirements.txt requirements.txt**: 依存関係ファイルをコンテナにコピー。
- **RUN pip install --no-cache-dir -r requirements.txt**: 依存関係をインストール。
- **COPY . .**: ソースコードをコンテナにコピー。
- **ENV FLASK_APP=src/app/main.py**: Flaskアプリケーションのエントリーポイントを設定。
- **CMD ["flask", "run"]**: Flaskサーバーを起動するコマンド。