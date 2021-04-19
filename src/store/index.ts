import { createStore } from 'vuex'
import getters from './getters'
import template from './modules/template';

export default createStore({
    modules: {
        template
    },
    getters
})