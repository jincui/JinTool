<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="stylus">
html
  font-size 62.5%
body
  font-size 1.4rem
  min-height 100vh
  // background: #355C7D;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(to right, #C06C84, #6C5B7B, #355C7D);  /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to right, #C06C84, #6C5B7B, #355C7D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  // background-image: linear-gradient( 135deg, #FFF5C3 10%, #9452A5 100%);
</style>

