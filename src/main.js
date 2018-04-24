import Vue from 'vue'
import App from './App.vue'
import editor from 'vue2-ace-editor'

Vue.component('editor', editor)

new Vue({
  el: '#app',
  render: h => h(App)
})
