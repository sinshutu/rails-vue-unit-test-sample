import Vue from 'vue'
import Todos from './todos.vue'
import '../stylesheets/todos.scss'

new Vue({
    render(h) {
        return h(Todos)
    }
}).$mount('#todos-sample')
