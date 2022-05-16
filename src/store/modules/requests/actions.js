export default {
    async contactCoach(context,payload){
        const newRequest={
            // id:new Date().toISOString(),
            coachId:payload.coachId,
            email:payload.email,
            message:payload.message
        }
        const response=await fetch('http://localhost:3000/contact',{
            method:'POST',
            body:JSON.stringify(newRequest)
        })
        const responseData=await response.json()
        if(!response.ok){
            throw new Error(responseData.message || 'Failed to send request.') 
        }
        context.commit('addRequest',newRequest)
    },
    async fetchRequests(context){
        const coachId=context.rootGetters.userId;
        const response=await fetch(`http://localhost:3000/getRequestList?id=${coachId}`)
        const responseData=await response.json()
        if(!response.ok){
            throw new Error(response.message||'Failed to fetch request.')
        }
        const requests=[]
        const data=responseData.data
        for(const key in data){
            const request={
                id:data[key]._id,
                coachId:coachId,
                email:data[key].email,
                message:data[key].message
            }
            requests.push(request)
        }
        context.commit('setRequests',requests)
    }
}