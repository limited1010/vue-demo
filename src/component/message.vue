<template>
  <!-- message.vue -->
  <div>
    <h1>消息</h1>
    <router-link to="about">跳转到about</router-link>
    {{ message }}
    <button @click="handleClick">ChangeWord</button>
    {{ $store.state.count }}
    <!--  获取vuex组件store的count,  -->
    {{ count }}
    <div>
      <button @click="handleIncrement">increment</button>
      <button @click="handleDecrease">decrease</button>
      <button @click="handleActionIncrement">actionIncrement</button>
      <button @click="handleAsyncIncrement">asyncIncrement</button>
    </div>
    <p>原始list:{{ list }}</p>
    <p>在store过滤后小于10的数据:{{ filteredlist }} </p>
    <p>list小于10的个数:{{ listCount }}</p>
  </div>
</template>
<!-- vuex插件所解决的问题与bus(中央事件总线)类似,可以更好管理和维护整个项目组件状态
,一个组件可分为组件(component)和视图(view),数据视图同步更新;
  这里的数据和方法只有在当前组件可访问和使用,其它组件无法读取和修改;但在实际业务中经常
有跨组件需求，因此vuex是用来统一管理跨组件状态的，它定义一系列规范来使用和操作数据，使
组件应用更高效;场景为大型单页应用，适合多人协同开发;
  在组件内，store的数据只能通过显示的提交mutations改变;
  mutation里尽量不要异步操作数据，否则组件在commit后数据不能立即改变，而且不知道什么
时候改变;
getter也可以依赖其它的getter，把getter作为第二个参数;
改变数据用mutations，存在业务逻辑的用actions，将业务逻辑放在action还是组件根据
实际场景决定;
通过modules将store分割到不同文件,每个module都拥有自己的state、getters、mutations、
actions,可以多层嵌套;
 -->

<script>
export default {
  name: "message",
  data() {
    return {
      message: 'helloWord!'
    };
  }, methods: {
    handleClick() {
      this.message = 'Hello Vue!';
    }, handleIncrement() {
      /*this.$store.commit({ // 参数不够用时可以传对象;
        type: 'increment',
        count: 10
      }*/
      this.$store.commit('increment');
    }, handleDecrease() {
      this.$store.commit('decrease');
    }, handleActionIncrement() { // 异步操作数据
      this.$store.dispatch('increment');
    }, handleAsyncIncrement() {
      this.$store.dispatch('asyncIncrement').then(() => {
        console.log(this.$store.state.count);
      })
    }
  }, computed: {
    list() {
      return this.$store.state.list;
    },
    count() {
      return this.$store.state.count;
    }, filteredlist() {
      return this.$store.getters.filteredList;
    }, listCount() {
      return this.$store.getters.listCount;
    }
  }
}
</script>

<style scoped>

</style>