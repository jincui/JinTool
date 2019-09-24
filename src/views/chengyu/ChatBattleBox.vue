<template lang="pug">
div.chat-view(ref="box")
  .chat-item(
    v-for="item in data"
    :key="item.id"
    v-bind:class="{ 'text-right': user && user.name === item.name }"
  )
    p(v-if="item.type")
      span.tip(:class="[item.type]") {{item.msg}}
    p(v-else)
      span.name {{item.name}}：
      span {{item.content}}
      span.system-tip(v-if="item.tip") ({{item.tip}})
</template>
<script>
export default {
  props: ['data', 'user'],
  watch: {
    data: function() {
      console.log('data change')
      setTimeout(() => {
        const dom = this.$refs.box;
        dom.scrollTop = dom.scrollHeight - dom.offsetHeight
      }, 0)
      
    }
  }
};
</script>

<style lang="stylus" scoped>
.chat-view
  max-height 400px
  overflow-y auto
.chat-item
  text-align left
  margin: 2px 0px
  font-size 1.4rem
  .name
    color pink
  .system-tip
    font-size 1.3rem
    color white
    margin-left 10px
  &.text-right
    text-align right
  .tip
    font-size 1.2rem
    &.info 
      color blue
    &.error
      color red

</style>
