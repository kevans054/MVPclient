import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'
import Feed from '../views/Feed.vue'
import UserProfile from '../components/UserProfile.vue'
import EventForm from '../views/EventForm.vue'
// import EventEdit from '../views/EventEdit.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "LoginForm",
    component: LoginForm
  },
  {
    path: '/sign-up',
    name: "SignupForm",
    component: SignupForm
  },
  {
    path: '/feed',
    name: "Feed",
    component: Feed
  },
  {
    path: '/userprofile',
    name: "UserProfile",
    component: UserProfile
  },
  {
    path: '/eventform',
    name: "EventForm",
    component: EventForm
  },
  // {
  //   path: '/eventedit',
  //   name: "EventEdit",
  //   component: EventEdit
  // }
]
const router = new VueRouter({
  routes
})

export default router