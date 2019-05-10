<template lang="pug">
.user-box
  ul.user-list
    li(v-for="user in users" :key="user.id" :class="{active: turn === user.id}") {{ user.name }}

</template>
<script>
export default {
  props: ['users', 'turn'],
};
</script>

<style lang="stylus" scoped>
.user-list
  li
    &.active
      color purple
</style>
