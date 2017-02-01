import Vue from 'vue'
import Todos from './todos.vue'

new Vue({
    render(h) {
        return h(Todos)
    }
}).$mount('#todos-sample')
