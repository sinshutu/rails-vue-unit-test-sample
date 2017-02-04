# railsでvueを動かす

## セットアップ

### コマンド
```
$ docker-compose build
$ docker-compose up -d
```

### ブラウザで確認
http://localhost:3000

## webpackの操作

### 静的ファイルのビルド
/public/assets 以下にビルドされたファイルを設置する
```
$ docker-compose run vue npm build
```

### 静的ファイルの削除
/public/assets を削除する
```
$ docker-compose run vue npm build
```
