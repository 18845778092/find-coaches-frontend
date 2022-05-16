export default {
    requests(state,_,_2,rootGetters){  //获取自己的request
        const coachId=rootGetters.userId;
        return state.requests.filter(coach=>coach.coachId===coachId)
    },
    hasRequests(_,getters){
         //getters.requests要过滤成自己的请求，state.requests是所有的
        return getters.requests && getters.requests.length>0   
    }
}