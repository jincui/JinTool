<template lang="pug">
div.chat-view
  .chat-item(
    v-for="item in data"
    :key="item.id"
    v-bind:class="{ 'text-right': user && user.name === item.name }"
  )
    p(v-if="item.type")
      span.tip(:class="[item.type]") {{item.msg}}
    p(v-else)
      | {{item.name}}: {{item.content}}
      span(v-if="item.tip") ({{item.tip}})
</template>
<script>
export default {
  props: ['data', 'user'],
};
</script>

<style lang="stylus" scoped>
.chat-view
  // max-height 400px
  // overflow-y auto
.chat-item
  text-align left
  margin: 2px 0px
  &.text-right
    text-align right
  .tip
    font-size 10px
    &.info 
      color blue
    &.error
      color red

</style>
