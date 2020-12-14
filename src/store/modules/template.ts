const template = {
    state: {
        testData: ""
    },
    mutations: {
        TEST_COMMIT: (state, data) => {
            state.testData = data
        }
    },
    actions: {
        testAction({ commit }, data) {
            commit("TEST_COMMIT", data)
        }
    }
}

export default template