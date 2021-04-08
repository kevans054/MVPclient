import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"
import VueInputAutowidth from 'vue-input-autowidth'
// import {BFormTextarea} from 'bootstrap-vue'
// Vue.component('b-form-textarea', BFormTextarea)
Vue.use(VueInputAutowidth)
Vue.component("v-select", vSelect);
// Vue.component("v-textarea", vtextarea)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
