import { createStore } from 'vuex'
import coachesModule from './modules/coaches/index.js'
import requestsModule from './modules/requests/index.js'
import authModule from './modules/auth/index.js'
export default createStore({
  modules: {
    coaches:coachesModule,
    requests:requestsModule,
    auth:authModule
  },
  mutations: {
  },
  actions: {
  }
})
