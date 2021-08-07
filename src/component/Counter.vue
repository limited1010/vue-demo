<template>
<!-- counter.vue -->
  <div>
    {{ number }}
    <button @click="handleAddRandom">随机增加</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    number: {
      type: Number
    }
  },
  methods: {
    handleAddRandom: function () {
      // 随机获取1~100的数;
      const num = Math.floor(Math.random() * 100 + 1);
      this.$bus.emit('add', num);
    }
  }
}
</script>

<style scoped>

</style>