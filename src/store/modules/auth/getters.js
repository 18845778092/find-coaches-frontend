export default {
    //获取根state的用户id
    userId(state) {
        return state.userId || localStorage.getItem('id')
    },
    isLoggedIn(state){
        return state.userId || localStorage.getItem('id')
    }
}