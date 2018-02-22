<template>
  <div id="all">
    <header>
      <img src="../assets/logo.png" alt="Vue"/>
      <button id="expand" @click="FullScreen = !FullScreen">
        <svg width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 75 75" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 64 64">
          <g>
            <g fill="#bbb">
              <path d="m62,45c-1.105,0-2,0.896-2,2v13h-13c-1.105,0-2,0.895-2,2s0.895,2 2,2h15c1.105,0 2-0.895 2-2v-15c0-1.104-0.895-2-2-2z"/>
              <path d="m17,60h-13v-13c0-1.104-0.895-2-2-2s-2,0.896-2,2v15c0,1.105 0.895,2 2,2h15c1.105,0 2-0.895 2-2s-0.895-2-2-2z"/>
              <path d="m17-.001h-15c-1.105,0-2,0.896-2,2v15c0,1.104 0.895,2 2,2s2-0.896 2-2v-13h13c1.105,0 2-0.896 2-2s-0.895-2-2-2z"/>
              <path d="m62-.001h-15c-1.105,0-2,0.896-2,2s0.895,2 2,2h13v13c0,1.104 0.895,2 2,2s2-0.896 2-2v-15c0-1.104-0.895-2-2-2z"/>
            </g>
          </g>
        </svg>
      </button>
    </header>

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
            <button :class="{disable: Page <= 1}" @click="previous" @keydown.37="previous">
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
            <button :class="{disable: Page >= TotalPage}" @click="next" @keydown.39="next">
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
import Loader from '../articles/loader'

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
      event.preventDefault()
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
  }
}
</script>

<style scoped>
    .component-fade-enter-active, .component-fade-leave-active {
      transition: opacity .15s ease-in-out;
    }
    .component-fade-enter, .component-fade-leave-to {
      opacity: 0;
    }
</style>

<style lang="scss" scoped>
  #all {
    margin-bottom: 100px;
  }

  footer {
    box-shadow: -2px 1px 17px 0px rgb(240, 240, 240);
    background: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    margin: 0;

    .pageStatus {
      font-weight: bold;
      padding-top: 10px;
    }

    .controls {
      $buttonHeight: 30px;
      $margin: 10px;
      height: auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .PT button {
        height: $buttonHeight;
        min-width: 75px;
        background: #ebebeb;
        border: none;
        border-radius: 10px;
        margin: $margin;
        svg {
          line-height: 1em;
          fill: #868686;
        }
      }

      #PTNext {
        transform: rotate(180deg)
      }

      .backPB {
        $PBHeight: 20px;

        height: $PBHeight;
        margin: 0 10px;
        margin-top: ($buttonHeight + 2 * $margin) / 2 - $PBHeight / 2;
        width: 40%;
        min-width: 250px;
        background: rgb(240, 240, 240);
        border-radius: 20px;
        overflow: hidden;
        .PB {
          text-align: center;
          font-weight: bold;
          height: $PBHeight;
          background: #54d78e;
          background: -moz-linear-gradient(-45deg, #54d78e 0%, #39dc84 100%);
          background: -webkit-linear-gradient(-45deg, #54d78e 0%,#39dc84 100%);
          background: linear-gradient(135deg, #54d78e 0%,#39dc84 100%);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#54d78e', endColorstr='#39dc84',GradientType=1 );
          transition: width .2s;
          color: white;
          line-height: $PBHeight;
        }
      }
    }
  }

  header {
    $HeaderHeight: 50px;
    $ContentHeight: 30px;
    width: 100%;
    height: $HeaderHeight;
    box-shadow: 2px 4px 17px 0px rgb(235, 235, 235);
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    img {
      margin-top: $HeaderHeight / 2 - $ContentHeight / 2;
      height: $ContentHeight;
      padding-left: 20px;
    }
    #expand svg {
      margin-top: $HeaderHeight / 2 - $ContentHeight / 2;
      height: $ContentHeight;
      padding-right: 20px;
    }
  }

  .text-center {
    text-align: center
  }

  .disable {
    opacity: .5;
  }
</style>
