<!--index.vue -->
<template>
  <div>
    <h1>首页,{{$t("message.hello")}}</h1>
    <router-link to="about">跳转到about</router-link>
    <router-link to="message">跳转到message</router-link>
    <p>
      <img src="static/img/ps.jpg" style="width: 100%;height: 400px"/>
    </p>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>