# vuex-tut

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Outline

- 如何和 Vue 整合 - 注入 store & `this.$store`
- 簡化反覆設定的 computed 屬性 - `mapState`
  - `mapState` 主要是簡化 getter + setter of computed 的寫法（注意有 setter ）
  - 支援 `陣列` 的設定方式直接對於 store state 的屬性
  - 支援 `物件` 的設定方式，相同與原本 `computed` 的寫法
- DRY 整合資料處理 & 暫存 - getters
  - 例如：很多地方要 store.state.todos.filter(todo => todo.done) 簡化反覆寫的過濾條件
  - getters 預設支援 cached，只有在資料更新時才會變動
  - 如同 state ，getters 也支援 mapGetters
- 提交資料變更(同步) - mutations
  - store.commit('action_type', payload)
  - action_type 字串可以和 payload 整合成一個物件 {type: 'action_type', other: ...}稱為：Object-Style Commit
  - mutation_type 使用常數並抽成一個檔案可以協助其他開發者概覽所有操作行為 
  - mutation 內不得使用 非同步 操作
  - 在元件中使用 this.$store.commit('xxx')
  - 一樣如同 state 對應到 computed，mapMutations 可以簡化和對應到 methods
- 簡化的 Helpers
  - mapState -> computed
  - mapGetters -> computed (處理過的資料)
  - mapMutations -> methods
  - mapActions -> methods
- 處理非同步 - Actions
  - mutations 負責同步的資料異動 -> 直接操作資料本身
  - actions 負責非同步的資料異動 -> 使用 mutations 即提及 commit
  - store.dispatch('increment', payload)
  - 如同 mutations， actions 也支援 Object-Style Dispatch Commit
  - 如同 state, getters, mutations，actions 也支援 helper  - mapActions
- 組合多個 actions - Promise + async await
- 模組化 state, actions, mutations, getters
  - 同一成一個狀態樹，很快的所有程式碼就會擠在同一隻檔案，因此需要模組化機制
  - module  內部的 mutations 和 getters第一個參數拿到的 state 為 local 即就是模組內的 state
  - 重點：使用模組化的話，state 區分成 local 和 root 
  - modules 不能打散  { modules: {...moduleA } } 等於其 state 一定會被一個 物件包起來
  - 使用 modules 混到 vuex state managment 使用命名空間，外部在呼叫 mutations, actions, getters 的時候比較清楚
  - 同一 module 內部呼叫不需要加上前綴
  - dispatch 和 commit root 時需要加上 {root: true}，dispatch('someOtherAction', null, { root: true })
  - 重要：namespaced 之後的 getters, actions,  mutations要在 view 綁定時使用 @click="_self['foo/bar/action']"語法

