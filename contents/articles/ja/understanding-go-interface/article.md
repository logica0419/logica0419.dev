---
title: "Goのinterfaceを理解しよう！"
emoji: "🥪"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["Go"]
published: true
---

こんにちは、最近競プロが少しアツくなっているlogicaです。
先人が少ないけどGoで競プロをやるぞ！って言って、AtCoderの典型90問の簡単めなやつをやりながら、I/Oや二分探索、Union-Find木などをUtility化しています。

さて、Goを学んでいる人の中でかなりの人がつまずく部分、一番の代表は**interface**だと思っています。
struct / sliceあたりまでは割と直感的に動きますが、interfaceがいきなり機能・挙動共に直感的じゃなくなるんですよね。
それもそのはず、interfaceはそもそも「間接的に型を扱う」ためのものなのですから、直感的に理解できるはずはないのです。

今回は、僕の所属する[traP](https://trap.jp/)というサークルで行われた「Webエンジニアになろう講習会」という講習会の中で出た、「interfaceとは何か」という質問に対する僕の回答をブログ化しました。
質問をしてくれた後輩には好評をいただきましたので、他の人の助けにもなれば幸いです。

# はじめに

今回の対象読者は、[A Tour of Go](https://go-tour-jp.appspot.com/list)のBasicsまで終わったGoの学習者で、Methods and interfacesがよく理解できないという人です。
(interface以外の型や関数に関しては理解し、コードが読める事を前提とします)

説明をわかりやすくするために**厳密な定義を用いていない部分があります**ので、プロGopherの方々はどうか温かい目でご覧下さい。

# 型

「変数の形式」だというのはもう学ばれたことかと思います。
今回覚えてほしいことは、「**型はメソッドを持つことができる**」ということです。

# メソッド

メソッドは、**型が持つ関数**のことで、`{型}.{メソッド名}()`という形で呼び出すことができる特殊な関数です。

## メソッドが欲しい状況

例えば、以下のようなstructの型があるとします。

```go
type Blog struct {
  title   string
  content string
}
```

タイトルと中身の文章を持っただけの、ブログ記事を表す簡単な型です。

今、この記事を表示するために「`Blog`型を受け取って、中身の`title`と`content`を区切り線を介して繋げた文字列を出力する」関数(`GetFullArticle()`)が欲しいとします。
この関数は、普通の関数として以下のように書けますね。

```go
func GetFullArticle(b Blog) string {
  return b.title + "\n" + "------------" + "\n" + b.content
}
```

ですが、これを単体の関数として定義するよりは、「`Blog`型自体が、中身の`title`と`content`を区切り線を介して繋げた文字列を出力する**機能を持つ**」としたいと思いませんか？

## メソッドを使う

この時に使えるのがメソッドです。次のように書きます。

```go
func (b Blog) GetFullArticle() string {
  return b.title + "\n" + "------------" + "\n" + b.content
}
```

このように定義すると、`Blog`型の`b`という変数があるとき、`GetFullArticle(b)`(だけ)ではなく`b.GetFullArticle()`という形でメソッドを呼び出すことができます。

「**型に付いた機能として関数を定義する**」、これがメソッドの本質だと言っていいと思います(人により様々な解釈があります)。

# interface

ようやく本題、interfaceの説明に入りましょう。
interfaceは、「**同じメソッド(機能)を持つ複数の型を、ひとくくりにして扱う**ための仕組み」です。

## interfaceが欲しい状況

さあ、先ほどの例を使いましょう。先程の`Blog`型と、その機能である`GetFullArticle()`メソッドを再掲します。

```go
type Blog struct {
  title   string
  content string
}

func (b Blog) GetFullArticle() string {
  return b.title + "\n" + "------------" + "\n" + b.content
}
```

今、この`Blog`型の亜種として`Blog2`型を定義します。

```go
type Blog2 struct {
  title     string
  paragraph []string
}
```

記事の中身を、段落のまとまりとして持つような型としました。

この`Blog2`型に、先ほどの`Blog`型と同じく、「中身の`title`とcontent(ここでは記事の中身)を区切り線を介して繋げた文字列を出力する」という機能を持たせたいと思います。

```go
func (b Blog2) GetFullArticle() string {
  article := b.title + "\n" + "------------" + "\n"

  for _, paragraph := range b.paragraph {
    article += paragraph + "\n\n" // 段落の間は2重に改行する
  }

  return article
}
```

さてここで、`Blog`型と`Blog2`型について、その型の変数を受け取って`GetFullArticle()`で出力された文字列を`fmt.Println()`で出力する関数をそれぞれ定義したいとします。

```go
func DisplayBlog(b Blog) {
  fmt.Println(b.GetFullArticle())
}

func DisplayBlog2(b Blog2) {
  fmt.Println(b.GetFullArticle())
}
```

中身が全く同じであることに気づいたでしょうか。
そうなんです。**同じ機能を持つ複数の型について、その機能を使う中身が全く同じ関数がいっぱいできる**ことがあるのです。
これではコードがいっぱいになって読みにくいし、同じ機能を持つ型がまた増えた時、関数をその都度定義しなきゃいけなくなります。

どうにかして、これらの「**同じ機能を持つ型**」**をひとくくりに**して扱えないかな...

## interfaceを使う

そこで、満を持してinterfaceの出番です！
interfaceは、「**これらのメソッド(機能)を持っている型ならなんでも入っていい**よ！」という特殊な型です。

```go
type BlogInterface interface {
  GetFullArticle() string
}
```

このように定義することで、`BlogInterface`という型を指定した部分(**引数**や**構造体のフィールド**など)は「**`GetFullArticle()`という、引数を取らず`string`型を出力するメソッドがある型は、何でも入っていい**よ」という状態になります。
同じメソッドを持つ型を、ひとくくりにして扱えるわけです。

このinterfaceを使って、先ほどの`Display～～`関数をスッキリさせてみましょう。

```go
func DisplayBlog(b BlogInterface) {
  fmt.Println(b.GetFullArticle())
}
```

ドーン。終了です。
これで`Blog`型の`b`という変数も、`Blog2`型の`b2`という変数も

```go
DisplayBlog(b)
DisplayBlog(b2)
```

という風に`DisplayBlog()`関数に渡すことができます。
interfaceが、**同じメソッドを持つ複数の型をひとくくりにして扱える**という意味が分かったでしょうか？

## interfaceの注意点

1つ気をつけなければいけないことは、interface型の変数を使う時**メソッドしか使えなくなり**、そこに当てはまる**構造体のフィールドなどは使えなく**なります。

例えば、`DisplayBlog()`関数で、`title`が無い記事は出力したくないと思ったとき、

```go
func DisplayBlog(b BlogInterface) {
  if b.title == "" { // b.titleはアウト
    return
  }

  fmt.Println(b.GetFullArticle())
}
```

という書き方はできません。
interfaceは「ここに入る型は、このメソッドを持っているよ」ということしか保証してくれないからです。
別の言い方をすると、interfaceは単体としてみた時、**メソッドしか持たない型**であると言えます。

もしこのように`title`を使いたい場合、`GetTitle()`のようなタイトルを取得するだけのメソッドを`BlogInterface`の定義に追加して、`BlogInterface`でひとくくりにされた型全てにこのメソッドを用意する必要があります。

## 余談

### なぜ「interface」と呼ばれるのか

interfaceの言葉の意味を少し掘り下げてみましょう。
(以下はあくまで僕の理解です)

interfaceの和訳は「接触面」、大まかに言うと「**間に挟まるもの**」という意味の言葉です。
Goでは「**interfaceでない型**」と「それを**使うもの**(**構造体**・**関数**)」の間に挟まるのでそのような呼び方をされます。
(Go以前のプログラミング言語からある概念なので、厳密ではないです)

```go
type Type1 struct {～}
type Type2 int
type Type3 []string   // 全て、下記のinterfaceで指定されたメソッドを持つ

↓ ひとまとめにする

type Inter interface {～}

↓ 以下のように使える

func FuncX (i Inter) {～}
type TypeX struct {
  i Inter
}
```

上の図のように、「間に挟まっている」イメージが持てると思います。

ちなみにこのブログのアイコンが「🥪」なのは、この「間に挟まっている」イメージから選んでいます。

### interfaceのメリット

interfaceを使うと

- 複数の型に対する関数の定義を1回で済ませられる
- 構造体のフィールドを入れ替えられる

などの様々なメリットがありますが、これは学習を進めていくにつれて追々感じていくでしょう。

# `io.Reader`

最後に、interfaceの代表例と言える`io.Reader`型を紹介したいと思います。

標準パッケージのioには、`io.Reader`という型があります。
以下のように定義されます。

```go
type Reader interface {
  Read(p []byte) (n int, err error)
}
```

`Read()`という、「何かしらの内容を受け取った`p`という変数の中に格納し、格納したバイト数と起こったエラーを出力する」機能を持った型をひとくくりにするためのinterfaceです。

`io.Reader`は、指定された機能の少なさから、様々な型をひとまとめにすることができます。例えば

- `os.File`
  - ファイルを扱う構造体
  - `Read()`メソッドではファイルの中身を読みだす
- `net.Conn`
  - ネットワークのコネクションを扱う構造体
  - `Read()`メソッドでは受信したデータを読みだす
- `zip.Reader`
  - zip圧縮するための構造体
  - `Read()`メソッドでは持っているデータをzip圧縮して`p`に格納する

これらの様々な型を、「とりあえず中身を読み出して何かに使う」ような関数で受け取るとき、`io.Reader`としてひとくくりにできることがどれだけ有用かは想像できると思います。
例えば`Read()`した中身を出力する関数であったり、その文字数をカウントするような関数であったりです。

`io.Reader`に対する愛はこちらの記事に勝るものが無いので、`io.Reader`に興味が湧いた方は読んでみると良いと思います。

<https://qiita.com/ktnyt/items/8ede94469ba8b1399b12>

# おわりに

いかがでした？わかりやすかったですか？
Goをこれからバリバリ使っていきたい！という方々が、スムーズに学習を進める手助けとなれたなら幸いです。

traPで数年間にわたり開発が進められ、今僕がメンテナーをしている、traQというOSSのメッセージングサービスがあります。
その中身のGoコードでは多数のinterfaceが使用され、複数人で開発するのに適した構造のコードが組み上げられています。
もし「interfaceの実用例がもっと知りたい！」という方は、頑張って読解を進めてみると必ず力になると思います。

<https://github.com/traPtitech/traQ>

それでは夜も遅いので、キーボードから手を放そうと思います。
またどこかでお会いしましょう。
