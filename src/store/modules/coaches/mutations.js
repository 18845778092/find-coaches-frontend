export default {
    registerCoach(state,payload){   //注册coach
        state.coaches.push(payload)
    },
    setCoaches(state,payload){
        state.coaches=payload
    },
    setFetchTimestamp(state){
        state.lastFetch=new Date().getTime();
    }
}