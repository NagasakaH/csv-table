# csv-table

## 概要

imgタグでsrcにcsvファイルを指定するとテーブルを描画するライブラリ  
mkdocsにtableを埋め込む時などに使う

## 使い方


```html
<body>
  <img src="test.csv" alt="csv"/>
  <script src="csvTable.js" type="text/javascript"></script>
  <script>csvTable.csvTable();</script>
</body>
```
