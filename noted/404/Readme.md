# 開発者向け

## ビルドツール
- matter-js
  - [index](https://brm.io/matter-js/)
  - [doc](https://brm.io/matter-js/docs/)
  - [demo](https://brm.io/matter-js/demo/)
  - [source](https://github.com/liabru/matter-js)


## ビルドコマンド

```bash
# 階層移動
cd noted/404

# nodeモジュールインストール
npm install

# 開発環境起動(ホットリロード)
npm run dev

# 本番用バンドル
npm run build
```

## ディレクトリ構成
```
/noted/404/
    - dist/   : webpackによるバンドルファイル
	- public/ : web配信するリソース用ディレクトリ
		- resource/	: 画像ファイル系
		- src/  	: jsファイル
		- index.html: メインとなるhtml
	- webpack.config.js : webpackのコンフィグ
```

## 開発知見

### `~`エイリアス

画像のURLとして`~`エイリアスが有効。
```js:例
import img from '~/resource/crush.svg';
console.log(img);
```

