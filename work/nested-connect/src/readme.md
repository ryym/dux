`connect`でラップされたコンポーネント (以下`connected`) が入れ子になった場合の動作確認。
`render`が必要以上に呼ばれるなどの問題は特に無さそう。

ただルートコンポーネントではない`connected`がいる場合、親が`connected`であろうとなかろうと、
親コンポーネントが再描画される際に`connected`の`componentWillReceiveProps`と`store.subscribe`のコールバックが走って、
`mapProps`が2回実行されちゃう (`connected`のpropsが空でも同じ)。
