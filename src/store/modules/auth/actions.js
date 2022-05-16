export default{
    async login(context,payload){
        const response=await fetch('http://localhost:3000/users/login',{
            method:'POST',
            body:JSON.stringify({
                email:payload.email,
                password:payload.password
            })
        })
        const responseData=await response.json()
        if(responseData.errno===-1){
            throw new Error(responseData.message||'Failed to sinup')
        }
        localStorage.setItem('id',responseData.data['_id'])
        context.commit('setUser',{
            userId:responseData.data['_id']
        })
        return true
    },

    async signup(context,payload){
        const response=await fetch('http://localhost:3000/users/signup',{
            method:'POST',
            body:JSON.stringify({
                email:payload.email,
                password:payload.password
            })
        })
        const responseData=await response.json()

        if(responseData.errno===-1){
            throw new Error(responseData.message||'Failed to sinup')
        }
        // context.commit('setUser',{
        //     userId:responseData.data['_id']
        // })
    },
    logout(context){
        context.commit('setUser',{
            userId:null
        })
        localStorage.removeItem('id')
    }
}