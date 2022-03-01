export const state = () => ({
    anyValues: 0,
  })
  
  export const mutations = {
    updateCounter(state,playload){
        state.anyValues += 1;
    },
  }
  
  export const actions = {
    fetchProfile({state,commit},data){
        
    },
    async fetchOrderBook({state,commit},data){
        let response = await this.$axios.get('/histories/full');
        commit('updateOrderBook',response.data.data.data)
    },
  }