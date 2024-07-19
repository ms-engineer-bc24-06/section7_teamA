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