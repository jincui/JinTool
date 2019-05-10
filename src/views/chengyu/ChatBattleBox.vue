<template lang="pug">
div.chat-view
  .chat-item(
    v-for="item in data"
    :key="item.id"
    v-bind:class="{ 'text-right': user && user.name === item.name }"
  )
    p
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
  max-height 400px
  overflow-y auto
.chat-item
  text-align left
  &.text-right
    text-align right
</style>
