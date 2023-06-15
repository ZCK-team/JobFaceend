import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// // 定义路由组件
// const Home = { template: '<el-menu-item>首页</el-menu-item>' };
// const PositionSearch = { template: '<el-menu-item>查询</el-menu-item>' };
import Index from './src/components/Index'
import Login from './src/view/Login'
import Home from './src/view/visualization/Home.vue';
import PositionSearch from './src/view/positionSearch/positionSearch.vue';

// 创建路由实例
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/Login', // 默认重定向到 /Login 登录页面
        },
        {
            path: '/Login',
            component: Login,
        },
        {
            path: '/Index',
            component: Index,
            children:[
                { path: '/Home', component: Home },
                { path: '/PositionSearch', component: PositionSearch },
            ]
        },
    ]
});

export default router;
