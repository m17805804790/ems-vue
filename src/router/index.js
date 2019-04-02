import Vue from "vue"
import Router from "vue-router"
import Login from "../components/Login";
import MainMenu from "../components/MainMenu"
import Table from "../components/Table"
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/mainmenu",
      component: MainMenu,
      children: [
        {
          path:"userlist",
          component:Table
        }
      ]
    }
  ]
})
