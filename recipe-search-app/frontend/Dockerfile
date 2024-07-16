
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
