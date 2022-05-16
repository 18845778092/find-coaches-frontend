export default {
    async registerCoach(context, payload) {   //注册coach
        const userId=context.rootGetters.userId;
        const coachData = {
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas,
            userId
        }
        const res=await fetch('http://localhost:3000/users/register',{
            method:'PUT',
            body:JSON.stringify({
                ...coachData,
                fullName:payload.first+' '+payload.last
            })
        })
        // const resData=await res.json();
        if(!res.ok){
            //...error
        }
        context.commit('registerCoach',{
            ...coachData,
            id:userId
        })
    },
    async loadCoaches(context,payload){
        if(!context.getters.shouldUpdate && !payload.refresh){
            return
        }
        const response=await fetch('http://localhost:3000/users/coachesList')
         const res=await response.json()
         let coachesList=[]
         const data=res.data
        if(res.errno===0){
            for(let i in data){
                const coach={
                    id:data[i].userId,
                    firstName:data[i].firstName,
                    lastName:data[i].lastName,
                    description:data[i].description,
                    hourlyRate:data[i].hourlyRate,
                    areas:data[i].areas
                }
                coachesList.push(coach)
            }
        }else{
            throw new Error(res.message || 'Failed to load')
        }
         context.commit('setCoaches',coachesList)
         context.commit('setFetchTimestamp')
    }
}