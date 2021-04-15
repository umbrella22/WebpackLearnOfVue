import type { Commit } from 'vuex'
interface StateType {
    testData: string
}
const template = {
    state: {
        testData: ""
    },
    mutations: {
        TEST_COMMIT: (state: StateType, data: string) => {
            state.testData = data
        }
    },
    actions: {
        TEST_ACTION({ commit }: { commit: Commit }, data: string) {
            commit("TEST_COMMIT", data)
        }
    }
}

export default template