<template>
  <div id="all" :class="{margin: !FullScreen}">
    <headroom>
      <header>
        <img src="../assets/logo.png" alt="Vue"/>
        <button id="expand" @click="FullScreen = !FullScreen">
          <svg width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 75 75" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 64 64">
            <g>
              <g :style="{fill: FullScreen ? '#555' : '#bbb'}">
                <path d="m62,45c-1.105,0-2,0.896-2,2v13h-13c-1.105,0-2,0.895-2,2s0.895,2 2,2h15c1.105,0 2-0.895 2-2v-15c0-1.104-0.895-2-2-2z"/>
                <path d="m17,60h-13v-13c0-1.104-0.895-2-2-2s-2,0.896-2,2v15c0,1.105 0.895,2 2,2h15c1.105,0 2-0.895 2-2s-0.895-2-2-2z"/>
                <path d="m17-.001h-15c-1.105,0-2,0.896-2,2v15c0,1.104 0.895,2 2,2s2-0.896 2-2v-13h13c1.105,0 2-0.896 2-2s-0.895-2-2-2z"/>
                <path d="m62-.001h-15c-1.105,0-2,0.896-2,2s0.895,2 2,2h13v13c0,1.104 0.895,2 2,2s2-0.896 2-2v-15c0-1.104-0.895-2-2-2z"/>
              </g>
            </g>
          </svg>
        </button>
      </header>
    </headroom>

    <div id="component">
      <transition name="component-fade" mode="out-in">
        <component :is="View"></component>
      </transition>
    </div>

    <transition name="component-fade">
      <footer v-if="!FullScreen">
        <div class="pageStatus textCenter">
          {{ Page }} / {{ TotalPage }}
        </div>
        <div class="controls">
          <div class="PT" id="PTPrev" >
            <button @click="previous" @keydown.37="previous">
              <svg version="1.1" id="Capa_1" width="25px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 28 28" style="enable-background:new 0 0 30 30;" xml:space="preserve">
                <path d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554
                c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587
                c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"/>
              </svg>
            </button>
          </div>

          <div class="backPB">
            <div :style="{width: Progression + '%'}" class="PB">
              <div v-if="Progression > 0">
                {{ Progression }} %
              </div>
            </div>
          </div>

          <div class="PT" id="PTNext">
            <button @click="next" @keydown.39="next">
              <svg version="1.1" id="Capa_1" width="25px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 28 28" style="enable-background:new 0 0 31.494 31.494;" xml:space="preserve">
                <path d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554
                c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587
                c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"/>
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </transition>
  </div>
</template>

<script>
import Loader from '../pager/loader'
import { headroom } from 'vue-headroom'

export default {
  name: 'Pager',
  data: function () {
    let Page = 1
    return {
      FullScreen: false,
      Page: Page,
      TotalPage: Loader.Count
    }
  },
  methods: {
    next: function () {
      this.pageTurner(1)
    },
    previous: function () {
      this.pageTurner(-1)
    },
    pageTurner: function (value) {
      this.Page = Loader.TurnPage(this.Page, value)
    }
  },
  computed: {
    Progression: function () {
      return Math.round(this.Page / this.TotalPage * 100, -1)
    },
    View: function () {
      return Loader.LoadView(this.Page)
    }
  },
  mounted: function () {
    let _this = this
    window.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        // Right arrow
        case 37:
          _this.previous()
          break
        // Left arrow
        case 39:
          _this.next()
          break
      }
    })
  },
  components: {
    headroom
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/pager.scss';
</style>

<style scoped>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .15s ease-in-out;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
</style>
