# タスクランナーのサンプル

タスクランナーを使ったサンプルプロジェクトです。

Grunt、gulpの両方を用意しています。（実際の運用ではどちらか一方で十分です。）

## 使い方

1. 一連のファイルを任意の場所に配置します。
2. コンソールから配置したディレクトリーを開きます。
3. `npm install`を実行すると、関連パッケージが全てインストールされます。（数分間かかる事があります。）
4. `grunt`を実行すると、ファイルのコンパイルや簡易サーバーの起動が行われます。
5. `http://localhost:8000`をウェブブラウザーで開いてください。

## ディレクトリー構成

```
project
├── bower_components  …… （Bowerが作成）
├── bower.json  …………… Bowerの設定
├── Gruntfile.js  ………… Gruntの設定
├── gulpfile.js …………… gulpの設定
├── node_modules  ………… （npmが作成）
├── package.gulp.json …… npmプロジェクトの設定（gulp用）
├── package.json  ………… npmプロジェクトの設定（Grunt用）
├── public  ………………… 公開用ファイル群（Grunt/gulpが作成）
├── README.md ……………… 説明
├── src ……………………… ソース類
│   ├── coffee …………… ├ CoffeeScript
│   ├── html ……………… ├ HTML
│   ├── img  ……………… ├ 画像
│   └── scss ……………… └ SCSS
└── tmp ……………………… 公開ファイル作成用一時群（Gruntが作成）
```

### Gruntを使う場合

`gulpfile`と`package.gulp.json`は不要なので削除してください。

### gulpを使う場合

`Gruntfile`は不要なので削除してください。また`package.json`を一度削除し、`package.gulp.json`を`package.json`と名前を変えてください。
