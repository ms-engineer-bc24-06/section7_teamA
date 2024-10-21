# 今日のお味噌汁
### [今日のお味噌汁アプリ動画を再生する](https://drive.google.com/file/d/178yW5hcbuZNi_0jtpQRoGIj5QLwtDsg7/view?usp=share_link)

### Team-a : haruka , kumi , mikiko , nanako

### 設計書

### アプリ概要

- **目的**: 毎日飲むお味噌汁を、ゲーム感覚で提案するお味噌汁好きの為のレシピアプリ。季節の野菜を使った提案が可能で、お気に入り機能を使ってレシピの保存が可能。- 
- **機能**:
    - 季節に合ったお味噌汁レシピを、ランダムに１つ提案（春、夏、秋、冬）
    - ユーザー認証・認可機能（Firebaseを利用したGoogle認証）
    - お気に入り機能（ユーザーごとのお気に入りを表示）
- **選定理由**:
  - 毎日食する味噌汁を、ワンクリック提案してくるアプリがあったら便利だな
  - お気に入りに保存して、見れたらいいな
  - 世間にあるレシピアプリと比較して、より、1つの料理に絞ったレシピも珍しいのではないか。

### 使用技術

- **フロントエンド**: Next.js
- **バックエンド**: Python (Flask)
- **データベース**: MySQL (レシピとお気に入り情報の保存)
- **環境**:Docker
- **管理ツール**:GitHub

### フロントエンド: Next.js

<aside>
💡 選定理由

 - 使用実績があったことと、使いやすいこと。
 - APProuterについては、今後の開発や卒業後も使用する可能性があること。

</aside>

### **バックエンド:**

### **言語：Python**

<aside>
💡 選定理由

**利用頻度やshare率の面**
 - 言語人気動向（Googleトレンドより）からも、ニーズが高い技術だと予想されること。

**プロジェクトの性質や要求面**
 - 今回のサービスが、データ取得などの処理を行う必要があったため、Pythonが簡潔な文法・大量のデータ処理を利用するウェブアプリケーションと相性がいい言語だったこと。
 - 更に、機械学習と親和性があって、AIを活用した機能を実装するような場合など、今後の開発を見据えて経験しておく必要性を感じたから。

</aside>

### 人気度の動向（言語）

[C++, PHP, Python, JavaScript, Ruby - 調べる - Google トレンド](https://trends.google.co.jp/trends/explore?date=all&geo=JP&q=%2Fm%2F0jgqg,%2Fm%2F060kv,%2Fm%2F05z1_,%2Fm%2F02p97,%2Fm%2F06ff5#TIMESERIES)

![Untitled](recipe-search-app\document\images\image1.png)

| 言語名 | フレームワーク | 利点 | 例 |
| --- | --- | --- | --- |
| Python | Django, Flask | 豊富なライブラリ、簡潔な文法、データサイエンスや機械学習との親和性 | データ処理や機械学習を利用するウェブアプリケーション |
| Ruby | Ruby on Rails | 生産性の高い開発、シンプルな構文、強力なコミュニティサポート | 素早くプロトタイプを作成するためのウェブアプリケーション |
| Java | Spring Boot | 大規模なエンタープライズアプリケーションに適している、高いパフォーマンスとスケーラビリティ | 大規模な企業向けシステム |
| Go | Gin, Echo | 高いパフォーマンスと効率的な並行処理、シンプルな構文 | 高パフォーマンスが要求されるマイクロサービスアーキテクチャ |
| Rust | Rocket, Actix | メモリ安全性、高パフォーマンス | セキュリティが重要なシステムやリアルタイム処理が求められるアプリケーション |
| PHP | Laravel, Symfony | ウェブ開発に特化しており、豊富なフレームワークとコミュニティサポート | 中小規模のウェブアプリケーションやコンテンツ管理システム（CMS） |

### **フレームワーク：Flask**

<aside>
💡 選定理由
人気動向では、2番目となっていたが、開発期間やアプリの規模を踏まえ、
●　Diangoほど大きなプロジェクトではないことと学習期間の点、
●　さらにエラーなどがあった場合に、FastAPIのような新しい技術よりネットでの情報量を得やすいだろうという点などから
Flaskを選定。

</aside>

### 人気度の動向（フレームワーク ）

![Untitled](recipe-search-app\document\images\image2.png)

![Untitled](recipe-search-app\document\images\image3.png)

### **データベース**: Firebase (ユーザー情報の保存と認証)

<aside>
💡 使用実績があることと、開発規模及びスケジュール感で決定。

</aside>

### GitHubのブランチ名

### 作業担当者名でbranchを作成

<aside>
💡 チームでのプロジェクトが初めてで、初めての技術も触るため、branch名は各々の指名で一旦管理してみる方向。
今回の結果を踏まえて、技術ごとや画面など、開発の管理に合ったbranch名を使用する。

</aside>

<details>
  <summary>OpenAPI</summary>

## OpenAPI仕様書
### 主な構成要素
 1. openapi: 仕様書のバージョン
 2. info: APIの基本情報（タイトル、バージョン、説明など）
 3. servers: APIのホスト名やベースURL。
 4. paths: 各エンドポイントとHTTPメソッド（GET、POST、PUT、DELETEなど）。
 5. components: 再利用可能なデータ構造
 6. security: 認証情報はFirebase
 7. tags: エンドポイントの分類。
```{
  "openapi": "3.0.1",
  "info": {
    "title": "今日のお味噌汁 API",
    "version": "1.0.0",
    "description": "レシピとお気に入りを検索および管理するためのAPI。"
  },
  "servers": [
    {
      "url": "http://localhost:5000",
      "description": "ローカルサーバー"
    }
  ],
  "paths": {
    "/recipes": {
      "get": {
        "summary": "すべてのレシピを取得",
        "responses": {
          "200": {
            "description": "レシピのリスト",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Recipe"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/recipes/{id}": {
      "get": {
        "summary": "IDでレシピを取得",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "レシピオブジェクト",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Recipe"
                }
              }
            }
          },
          "404": {
            "description": "レシピが見つかりません"
          }
        }
      }
    },
    "/favorites": {
      "get": {
        "summary": "すべてのお気に入りを取得",
        "responses": {
          "200": {
            "description": "お気に入りレシピのリスト",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Favorite"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "新しいお気に入りを作成",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Favorite"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "お気に入りが正常に作成されました"
          }
        }
      }
    },
    "/favorites/{id}": {
      "get": {
        "summary": "IDでお気に入りを取得",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "お気に入りオブジェクト",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Favorite"
                }
              }
            }
          },
          "404": {
            "description": "お気に入りが見つかりません"
          }
        }
      },
      "put": {
        "summary": "IDでお気に入りを更新",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Favorite"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "お気に入りが正常に更新されました"
          },
          "404": {
            "description": "お気に入りが見つかりません"
          }
        }
      },
      "delete": {
        "summary": "IDでお気に入りを削除",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "お気に入りが正常に削除されました"
          },
          "404": {
            "description": "お気に入りが見つかりません"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Recipe": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "season": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "Favorite": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "season": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "user_id": {
            "type": "string"
          }
        }
      }
    }
  },
  "security": [
    {
      "firebaseAuth": []
    }
  ],
  "tags": [
    {
      "name": "recipes",
      "description": "レシピに関連する操作"
    },
    {
      "name": "favorites",
      "description": "お気に入りに関連する操作"
    }
  ]
}
```
</details>