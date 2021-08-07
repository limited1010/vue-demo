<template>
  <div>
<!--  about.vue  -->
    <h1>介绍页</h1>
    <router-link to="index">跳转到index</router-link>
    <button @click="handleRouter">跳转到user</button>
    <div>
      vue-bus随机增加:
      <counter :number="number"></counter>
    </div>
  </div>
  <!--
 vue-route有两种跳转方法:1.<route-link>组件会被渲染为a标签;2.类似于window.location.href
使用route实例的方法,比如在about.vue内通过点击事件跳转;
  1.to是一个prop指定需要跳转的路径，当然也可以用v-bind动态设置。使用route-link在html5
history模式下会拦截点击,避免浏览器重新加载页面;常用的prop有:
  tag:指定渲染成的标签;replace:不会留下历史记录，所以导航后不能用后退键返回上一个页面;
active-class:当对应的路由匹配成功时会自动给当前元素设置一个route-link-active的class,
设置prop:active-class可以修改默认的名称,在做类似导航栏时可以使用该功能高亮显示当前页面，
对应的导航菜单项;
  2.$route的replace类似于route-link的replace;go类似于window.history.go()，在history
记录中向前或后退多少步,参数是整数,
 -->
</template>

<script>

import Counter from "../../component/Counter.vue";
import Ajax from '../../js/util.js';

export default {
  name: "about",
  components: {Counter},
  data() {
    return {
      number: 0
    }
  },
  methods: {
    handleRouter() {
      this.$router.push('/user/123456');
    }, handleAddRandom(num){
      this.number+=num;
    }
  }, /*created() {
    this.$bus.on('add', num => {
      this.number += num;
    });
  }*/
  created() {
    this.$bus.on('add',this.handleAddRandom);
  }, beforeDestroy() {
    this.$bus.off('add',this.handleAddRandom)
  },mounted() {
    Ajax({
      method:'post',
      url:'/user/88383',
      data:{
        firstName:'Fred',
        lastName:'Flintstone'
      }
    }).then(res =>{
      console.log(res);
    })
  }

}
</script>

<style scoped>

</style>