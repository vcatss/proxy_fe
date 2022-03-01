export const state = ()=> ({
    model: [],
})
export const mutations = {
    init(state,payload) {
        state.model = payload;
    }
}
export const actions = {
    async fetchData({state,commit},data) {
        let res = await this.$axios.get('/api/proxy/package');
        commit('init', res.data)
    }
}
