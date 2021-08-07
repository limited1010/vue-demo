// entry.js
import Vue from "vue";
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueBus from '../js/vue-bus'; // 导入自定义插件
import VueI18n from 'vue-i18n';
import App from "../component/app.vue";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueBus);
Vue.use(VueI18n)

const Routers = [{
    path: '/index',
    meta: {
        title: '首页'
    },
    component: (resolve) => require(['../router/views/index.vue'], resolve)
}, {
    path: '/about',
    meta: {
        title: '关于'
    },
    component: (resolve) => require(['../router/views/about.vue'], resolve)
}, {
    path: '/user/:id',
    meta: {
        title: '用户'
    },
    component: (resolve) => require(['../router/views/user.vue'], resolve)
}, {
    path: '/message',
    meta: {
        title: '消息'
    },
    component: (resolve) => require(['../component/message.vue'], resolve)
}, { // 访问路径不存在重定向到首页
    path: '*',
    redirect: '/index'
}
];

const RouterConfig = {
    mode: 'history',
    routes: Routers
}

const router = new VueRouter(RouterConfig);

const moduleA={
    state:{
        count:0
    },
    mutations:{},
    actions:{},
    getters:{
        /*
        module的mutation和getter接收的第一个参数state是当前模块的状态，
  在actions和getters中，还可以接收一个参数rootState来访问根节点的状态;
         */
        sumCount(state,getters,rootState){
            return state.count+rootState.count;
        }
    }
};
const moduleB={
    state:{},
    mutations:{},
    actions:{},
    getters:{}
};

const store = new Vuex.Store({
    modules:{
        a:moduleA,
        b:moduleB
    },
    // vuex配置
    state: {
        count: 0,
        list: [11, 4, 17, 2, 19, 0, 2, 1]
    }, getters: {
        filteredList: state => {
            // 每个组件得到的都是过滤后的数据，不必每个组件写过滤方法
            return state.list.filter(item => item < 10);
        }, listCount: (state, getters) => {
            // 计算出过滤后结果的数量
            return getters.filteredList.length;
        }
    },
    mutations: {
        /*increment(state, params) { //接收第二个参数
            state.count += params.count;
        },*/increment(state, n=1) { //接收第二个参数
            state.count += n;
        },
        decrease(state) {
            state.count--;
        }

    }, actions: {
        // 在这异步操作数据
        /*
        Promise有三种方案:Pending(进行中),Resolved(已完成),Rejected(已失败)
         */
        increment(context) {
            context.commit('increment');
        }, asyncIncrement(context) {
            // 用promise在1s后提交;
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increment');
                    resolve();
                }, 1000)
            })

        }
    }
});
console.log(store.state.a); // 访问moduleA的状态
/*
    仓库store包含了应用的数据(状态)和操作过程,Vuex里的数据都是响应式的,任何组件使用
同一store数据时,store数据和对应组件同步更新;
 */

router.afterEach((to, from, next) => {
    window.document.title = to.meta.title;// 统一设置标题
})

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);// 将滚动条滚动到顶部;还有页面加载动画等;
})

const messages={
    en:{
        message:{
            hello:'hello World!'
        }
    },cn:{
        message: {
            hello:'你好,世界!'
        }
    }
}
const i18n=new VueI18n({
    locale:'en', // 设置当前语言
    messages, // 设置语言包
})


new Vue({
    el: '#app',
    router: router,
    i18n:i18n,
    store: store, // 使用vuex
    render: h => h(App)
})


