# ストックリフレクタとは
Googleスプレッドシートで管理されている在庫数を、[カラーミーショップ](https://shop-pro.jp/)へと自動で反映するシステムです。
面倒な手入力での在庫更新やCSVでの更新作業を自動化します。

# 更新頻度
- 日次更新

# 使用技術
- Typescript
- GoogleAppScript
- Clasp 
- ESlint
- カラーミーショップ API (1.0.0)

# 保守運用について
- エラーが発生したタイミングでmailによる通知が行われる

# 実行タイミング：
1. 毎日20時~21時に実行される。
2. 更新したいものがある場合は、20時までに更新をお願いします。

# 商品追加の場合：
1. カラーミーショップに商品を追加
2. 最新・在庫表に商品と販売王コードを追加
3. 在庫システム用シートに「販売王コード・商品名・オプション・ColorMeID・反映しないフラグ(任意)」を入力
4. 在庫システム用シートで在庫数が正しく表示されている（最新・在庫表と同じ値）か確認する。

## ※注意事項：
オプションが有る商品に関してはColorMeIDは同一のものを入力して、オプション名だけ変更してください。
### 商品削除の場合：
在庫システム用シートの行をまるごと消してもらう。

### 削除まではしないが、一旦反映しなくていい場合：
反映しないフラグをTRUEに変更する。

## 注意事項：
シート名を変更する場合はご連絡ください。「最新・在庫表」「在庫システム用」
「最新在庫表」に列を追加する場合はご連絡ください。例：単価とか、達成率とかその他なにかの項目 (L列より左)

---
# What is "Stock Reflector" ?
This system can udpate automatically each stock quantity displyaed on an online shop from Google Spread Sheet.
Usually, it takes too long time to input stock quantity of every product into the system.

# How often update?
- Daily

# Tech Stack
- Typescript
- GoogleAppScript
- Clasp 
- ESlint
- ColorMeShop API (1.0.0)

# Maintenance
- When something wrong happnes, the stystem send me email about it.
