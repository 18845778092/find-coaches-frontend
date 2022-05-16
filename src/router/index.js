import {createRouter,createWebHistory} from 'vue-router';

import CoachDetail from '../pages/coaches/CoachDetail.vue';
import CoachesList from '../pages/coaches/CoachesList.vue';
import CoachRegistation from '../pages/coaches/CoachRegistration.vue';
import ContactCoach from '../pages/requests/ContactCoach.vue';
import RequestsReceived from '../pages/requests/RequestsReceived.vue';
import NotFound from '../pages/NotFound.vue';
import UserAuth from '../pages/auth/UserAuth';
import store from '../store/index'
const routes = [
  {path: '/',redirect: '/coaches'},
  {path: '/coaches',component: CoachesList},    //coaches
  {path: '/coaches/:id',component: CoachDetail, 
    props:true,//coaches
    children: [{path: 'contact',component: ContactCoach}] //requests
  },
  {path:'/auth',component:UserAuth,meta:{requireUnauth:true}},
  {path: '/register',component: CoachRegistation,meta:{requireAuth:true}},  //coaches
  {path: '/requests',component: RequestsReceived,meta:{requireAuth:true}},  //requests
  {path: '/:notFound(.*)',component: NotFound},
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function(to,from,next){
  if(to.meta.requireAuth && !store.getters.isLoggedIn){
    next('/auth')
  }else if(to.meta.requireUnauth && store.getters.isLoggedIn){
    next('/coaches')
  }else{
    next()
  }
})

export default router