export default {
    coaches(state){         //获取所有coaches钩子
        return state.coaches;
    },
    hasCoaches(state){    //判断有无coaches的钩子
        return state.coaches && state.coaches.length>0
    },
    isCoach(_,getters,_2,rootGetters){
        const coaches=getters.coaches;
        const userId=rootGetters.userId;
        return coaches.some((coach)=>{
             return coach.id===userId
        })
    },
    shouldUpdate(state){
        const lastFetch=state.lastFetch;
        if(!lastFetch){
            return true
        }
        //大于1分钟就自动刷新
        const currentTimeStamp=new Date().getTime()
        return (currentTimeStamp-lastFetch)/1000 > 60;
    }
}