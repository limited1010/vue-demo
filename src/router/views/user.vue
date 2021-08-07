<!-- user.vue -->
<template>
  <div>
    <h1>用户页</h1>
<!--    <router-link to="about">跳转到about</router-link>-->
        <button @click="handleRouter">跳转到index</button>
    {{ $route.params.id }}
    <ele>
      <smart-item :data="data"></smart-item>
      <button @click="change('img')">切换为图片组件</button>
      <button @click="change('video')">切换为视频组件</button>
      <button @click="change('text')">切换为文本组件</button>
    </ele>
  </div>
</template>

<script>
import Vue from "vue";

// 图片组件选项
var ImgItem = {
  props: ['data'],
  render: function (createElement) {
    return createElement('div', [
      createElement('p', '图片组件'),
      createElement('img', {
        attrs: {
          src: this.data.url,
          width: '800px',
          height: '400px'
        }
      })
    ]);

  }
};
// 视频组件选项
var VidemItem = {
  props: ['data'],
  render: function (createElement) {
    return createElement('div', [
      createElement('p', '视频组件'),
      createElement('video', {
        attrs: {
          src: this.data.url,
          controls: 'controls',
          autoplay: 'autoplay'
        }
      })
    ]);
  }
};
// 纯文本组件选项
var TextItem = {
  props: ['data'],
  render: function (createElement) {
    return createElement('div', [
      createElement('p', '文本组件'),
      createElement('p', {
        attrs: {
          src: this.data.url,
          controls: 'controls',
          autoplay: 'autoplay'
        }
      })
    ]);
  }
};

export default {
  name: "user",
  data: function () {
    return {
      data: {}
    }
  },
  mounted() {
    console.log(this.$route.params.id)
  },
  methods: {
    handleRouter() {
      this.$router.push('/index');
    },
    change: function (type) { //切换不同类型组件的数据
      if (type === 'img') {
        this.data = {
          type: 'img',
          url: '../../static/img/img.png'
        }
      } else if (type == 'video') {
        this.data = {
          type: 'video',
          url: '../../static/move/video.mp4'
        }
      } else if (type === 'text') {
        this.data = {
          type: 'text',
          content: '这是一段文本'
        }
      }
    }
  }, created: function () {
    // 初始化时默认设置图片组件的数据
    this.change('img');
  }
}
/*
  这里的this.$route可以访问到当前路由的很多信息，在开发中经常用到里面的数据;因为配置
的是/user:id，直接访问会定向到/index，需要访问/user/123456;
 */

Vue.component('ele', {
  render: function (createElement) {
    if (this.$slots.default === undefined) {
      return createElement('div', '没有使用slot显示的文本')
    } else {
      return createElement('div', this.$slots.default);
    }
  }
});

Vue.component('smart-item', {
  functional: true, // 函数化组件
  render: function (createElement, context) {
    // 根据传入的数据判断显示哪种组件
    function getComponent() {
      var data = context.props.data;
      // 判断prop:data的type字段是属于哪种类型的组件
      if (data.type === 'img') return ImgItem;
      if (data.type === 'video') return VidemItem;
      return TextItem;
    }

    return createElement(
        getComponent(), { // 把smart-item的prop:data传给上面选择的组件
          props: {
            data: context.props.data
          }
        },
        context.children
    )
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
});

</script>

<style scoped>

</style>