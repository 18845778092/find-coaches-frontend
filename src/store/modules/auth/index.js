import mutations from './mutations';
import actions from './actions';
import getters from './getters';
export default{
    state(){
        return {
          userId:localStorage.getItem('id')|| null
        }
      },
      mutations,
      actions,
      getters
}