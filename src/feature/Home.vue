<template lang="pug">
.home-view
  div.banner-view
    .bg
    Input.search-input(v-model="search")
  div.tool-search-list
    .tool-item(v-for="tool in toolList")
      .tool-cover(:style="{ backgroundImage: 'url(' + tool.cover + ')' }")
      .tool-name {{ tool.name }}

</template>

<script>

export default {
  data() {
    return {
      search: null,
      toolList: [
        {
          name: '字体生成',
          cover: 'http://3.pic.pc6.com/thumb/up/2014-7/14060928939823225_600_0.jpg',
          link: '',
        },
        {
          name: '随机游戏',
          cover: 'https://www.wenba.ca/uploads/questions/20180226/45ee25db451c99541400ed549773a823.jpg',
          link: '',
        },
        {
          name: '成语接龙',
          cover: 'http://file.azg168.cn/file/shengxiao/long/20170715/0d3e818dd647e41f7d0eb5b860bbeb73.jpg',
          link: '',
        },
        {
          name: '画表情',
          cover: 'http://sucimg.itc.cn/avatarimg/e6aeed6c1cb647caa3fea7b1cb98d17f_1496979707575',
          link: '',
        },
      ],
    };
  },
};

</script>

<style lang="stylus">
@keyframes bg
  from
    background-position 0% 0%
  to
    background-position 100% 100%

.home-view
  .bg
    width 100%
    height 40vh
    background url('https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-354287.jpg')
    animation bg 18s ease-in-out infinite alternate
  .search-input
    width 300px
    position relative
    top -18px
  .tool-item
    display inline-block
    cursor pointer
    vertical-align top
    width 150px
    margin 20px
    height 140px
    box-shadow 0px 0px 3px alpha(black, 0.2)
    transition-duration 1s
    position relative
    .tool-cover
      width 100%
      height 80px
      background-size cover
      background-position center center
      transition-duration inherit
    .tool-name
      transition-duration inherit
      position absolute
      width 100%
      height 30px
      line-height 30px
      bottom 10px
    &:hover
      box-shadow 2px 2px 20px alpha(black, .3)
      .tool-cover
        height 140px
        img
          transform scale(1.5, 1.5)
      .tool-name
        background alpha(black, .5)
        color white
        font-weight bold
        bottom 50%
        transform translateY(50%)
</style>
