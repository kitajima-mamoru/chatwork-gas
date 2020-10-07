# ChatWork/gas/clasp
chatwork apiをgasを叩くことでメッセージを投稿する。  
typescriptで実装し、claspを用いてデプロイとjavascriptへのエンコードを行う。  
claspはnpmでインストールする。  
追加実装の際は[公式ドキュメント](https://developer.chatwork.com/ja/)がわかりやすいのでオススメ。  

## 各種バージョン
```
node: v14.8.0
npm: (最新: npm install -g npm)
```

# 環境構築
googleアカウントが必要なので、個人用のgoogleアカウントを用意する。  
会社用のgoogleアカウントはclaspが使えないよう制限されているので、  
個人用のgoogleアカウントを使用して個人用上にscriptを用意し個人用上で運用する方法を記す。  
個人用上で出来ないこと(例えば会社用アカウント上のスプレッドシートの情報を参照したい場合)は  
個人用上に作成されたスクリプトを、手動で会社用アカウント上にコピーする必要があり、私はこの運用を行っている。  

## 開発環境構築
```
nodenv local v14.8.0
npm install -g npm
npm install
npx clasp login (個人用アカウントでログインすること)
```

1. デプロイしたいGoogle Apps Scriptをブラウザ上で新規作成する  
claspには、新規にプロジェクトを作成するコマンドclasp createが用意されている。  
createはプロジェクト全体を新規作成するコマンドで、今回はこのリポジトリで管理されているコードをGASに反映させることが目的なので、  
手動でGASを作成しておき、そのファイルにコードを反映させる方式をとる。  
  1. 個人用アカウントでGASを新規に作成し、保存する
  1. そのGASを会社用アカウントと共有しておくと、所有アカウントを気にせず編集が行えて便利
  1. そのGASのurlからハッシュを取得する  
      例 https://script.google.com/d/hogefugahogefugahogefugahogefuga/edit => hogefugahogefugahogefugahogefuga
  1. 取得したハッシュを用いて[.clasp.json](/.clasp.json#L2)のscriptIdを書き換える
1. npx clasp push し、GASに反映させる
1. npx clasp open で反映されていたら成功

## chatwork api tokenの設定
chatwork apiを利用するために、chatworkアカウントのapi tokenを取得する。
これで認証することで、メッセージを送ることが出来るようになる。
1. [chatwork](https://www.chatwork.com/)を開き、右上の自身のアカウントをクリック
1. サービス連携 -> API tokenからAPI token文字列を取得する
1. [code.ts](/src/code.ts#L2)にtoken文字列を入力する

## 動作テスト
マイチャットにメッセージを送ることで動作確認を行う
1. [マイチャット](https://www.chatwork.com/)を開き、urlからマイチャットのroomIdを取得
    例 https://www.chatwork.com/#!rid123456789 -> 123456789
1. [sendMessage.ts](src/sendMessage.ts#L6) にroomIdを入力する
1. GASでcode.gsを開き、sendMessageを実行する。マイチャットにメッセージが送られれば成功。
初回は認証画面が出るので、手順に従ってGASがchat work apiを使うことを許可する

# lint
```
npx eslint src/code.ts
```
