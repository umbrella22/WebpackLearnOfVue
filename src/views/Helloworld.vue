<!--  -->
<template>
  <div>
    <div>欢迎来到vue3全家桶+webpack5，嘛虽然有点简单。。不过只能慢慢来了</div>
    <div>这里是vuex的getter得到的值：{{ templateData }}</div>
    <div @click="setVuexData">点击一下我，就会修改上面的值啦~</div>
  </div>
</template>

<script lang="ts">
// 这里使用的optionAPI和原来的vue2完全没有任何区别，这里仅仅只是做展示
import { mapGetters, useStore } from "vuex";
import { computed, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      templateData: computed(() => store.getters.templateData),
      setVuexData: () => store.dispatch("testAction", "已经修改值"),
    };
  },
});
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
</style>