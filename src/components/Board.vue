<template>
  <div id="board">
    <!-- search and sort fields -->
    <toolbar v-on:get-ranking="getLeaderBoard"></toolbar>
    <div class="columns">
      <div class="column is-12">
        <!-- campers leaderboard -->
        <!-- only display when got the response from fcc api -->
        <table
        v-if="campers.length" 
        class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th @click="order.sortTerm='alpha'; order.reverse = !order.reverse">camper</th>
              <th @click="order.sortTerm='brownies'; order.browniesMode='alltime'; order.reverse = !order.reverse">
                <div class="field">
                  <span>all time</span>
                  <img
                  :class="{'is-hidden': screenWidth < screenBreakPoints.tiny /* hide image on screen-size < 460px */}"
                  src="../assets/cookie.png" 
                  alt="cookie image" 
                  width="16">
                </div>
              </th>
              <th @click="order.sortTerm='brownies'; order.browniesMode='recent'; order.reverse = !order.reverse">
                <div class="field">
                  <span>recent</span>
                  <img
                  :class="{'is-hidden': screenWidth < screenBreakPoints.tiny /* hide image on screen-size < 460px */}" 
                  src="../assets/cookie.png" 
                  alt="cookie image" 
                  width="16">
                </div>
              </th>
              <th :class="{'is-hidden': screenWidth < screenBreakPoints.small /* hide table column on screen-size < 590px */}">last update</th>
            </tr>
          </thead>
          <!-- <tbody> -->
            <transition-group
            appear
            tag="tbody"
            enter-active-class="animated slideInLeft">
              <tr
              @click="highlighted = camper['#'] /* highlight the row on click */"
              :class="{'is-selected': highlighted === camper['#']}"
              :key="`camper-${camper['#']}`" 
              v-for="camper in filtered">
                <td><b>{{ camper['#'] /* camper ranking */}}</b></td>
                <td>
                  <div class="field">
                    <!-- .level class hiearchy to align the username ang the image -->
                    <div :class="{'level': screenWidth >= screenBreakPoints.medium /* no .level hiearchy on screen-size < 770px */}">
                      <div :class="{'level-left': screenWidth >= screenBreakPoints.medium, 'level-fixed': screenWidth >= screenBreakPoints.medium /* no .level hiearchy on screen-size < 770px */}">
                        <div 
                        class="level-item"
                        :class="{'is-hidden': screenWidth < screenBreakPoints.medium, 'level-fixed--img': screenWidth >= screenBreakPoints.medium /* hide image on screen-size < 770px */}">
                          <img
                          v-show="camper.imgLoaded /* only render when the image is fully loaded */"
                          :src="camper.img" alt="camper profile image" width="32">
                          <!-- display a loading icon when the image in not fully loaded -->
                          <a
                          v-show="!camper.imgLoaded"
                          class="button is-link is-loading is-small"></a>
                        </div>
                        <div :class="{'level-item': screenWidth >= screenBreakPoints.medium /* no .level hiearchy on screen-size < 770px */}">
                          <a 
                          :href="`${portfolioLinkPrefix}${camper.username}`"
                          target="_blank">
                            {{ camper.username }}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="has-text-info">
                    <b>{{ camper.alltime }}</b>
                  </span>
                </td>
                <td>
                  <span class="has-text-info">
                    <b>{{ camper.recent }}</b>
                  </span>
                </td>
                <td :class="{'is-hidden': screenWidth < screenBreakPoints.small /* hide table column on screen-size < 590px */}">
                  <span class="has-text-dark">{{ (new Date(camper.lastUpdate)).toLocaleDateString() }}</span>
                </td>
              </tr>
            </transition-group>
          <!-- </tbody> -->
        </table>
        <!-- loading icon -->
        <div v-else>
          <a class="button is-loading is-large is-link">Loading</a>
        </div>
        <!-- horizontal line -->
        <div class="level hr"></div>
        <!-- pagination -->
        <div class="column is-6 is-offset-3">
          <nav
          v-if="campers.length"
          class="pagination is-centered">
            <a
            @click="paginate(-1)" 
            class="pagination-previous">
              <span class="icon">
                <i class="fa fa-chevron-left"></i>
              </span>
            </a>
            <a
            @click="paginate(1)" 
            class="pagination-next">
              <span class="icon">
                <i class="fa fa-chevron-right"></i>
              </span>
            </a>
            <div class="pagination-list">
              <div class="level is-mobile">
                <div class="level-item">
                  <span>page</span>
                </div>
                <div class="level-item">
                  <span class="select control">
                    <!-- select page-->
                    <select v-model="pagination.currentPage">
                      <option
                      :key="`p-${page}`"
                      v-for="page in pagination.lastPage"
                      :value="page">{{ page }}</option>
                    </select>
                  </span>
                </div>
                <div class="level-item">
                  <span>of</span> 
                </div>
                <div class="level-item">
                  <span>{{ pagination.lastPage }}</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from './Tollbar';
import store from '../store';

export default {
  name: 'board',
  data() {
    return {
      // options to rearrange the displayed array of campers
      order: store.order,
      // an array of campers
      campers: store.campers,
      // contains the api urls to get the campers
      api: store.api,
      // prefix the camper usernames, prefix/username is the camper fcc portfolio
      portfolioLinkPrefix: 'https://www.freecodecamp.org/',
      // clicked board row: used to highlight the row, by adding .is-selected class
      highlighted: 0,
      // current screen-width
      screenWidth: window.innerWidth,
      // breakpoints for board responsivness
      screenBreakPoints: {
        tiny: 460,
        small: 590,
        medium: 770
      },
      // pagination metadata
      pagination: {
        currentPage: 1,
        perPage: 10,
        totalItems: null,
        lastPage: null,
        startIndex: 0
      }
    };
  },
  computed: {
    // return a rearranged array to display
    filtered() {
      return this.filter();
    }
  },
  components: {
    Toolbar
  },
  methods: {
    // http request to fcc api
    getLeaderBoard() {
      this.$http.get(this.api[this.order.rankingMode])
        .then(res => {
          this.initLeaderBoard(res.data);
          this.setPagination();
        })
        .catch(err => {
          console.log(err);
        })
    },
    initLeaderBoard(data) {
      this.campers = data.map((camper, index) => {
        // image object for each camper image
        let image = new Image();
        image.src = camper.img;
        // only show the image when fully loaded
        image.addEventListener('load', () => {
          this.campers[index].imgLoaded = true;
        }, false);
        return Object.assign({}, camper, {'#': index + 1, imgLoaded: false});
      });
    },
    setPagination() {
      this.pagination.totalItems = this.campers.length;
      this.pagination.lastPage = Math.ceil(this.pagination.totalItems / this.pagination.perPage);
    },
    filter() {
      // array to return
      let filtered = [];
      // control the ascendant or descandant sort order
      let orderedBy = this.order.reverse ? 1 : -1;
      if(!Boolean(this.order.searchTerm)) {
        // searchTerm empty return the full array
        filtered = this.campers.map(camper => camper);
      } else {
        // search term is not empty, filter by username containing the search term
        filtered = this.campers.filter(camper => camper.username.toLowerCase().includes(this.order.searchTerm.toLowerCase()));
      }
      filtered = filtered.map((camper, index) => {
        // image object for each camper image
        let image = new Image();
        image.src = camper.img;
        // only show the image when fully loaded
        image.addEventListener('load', () => {
          this.campers[index].imgLoaded = true;
        }, false);
        return Object.assign(camper, {imgLoaded: false});
      });
      switch(this.order.sortTerm) {
        // sort by brownies
        case 'brownies':
          filtered.sort((a, b) => (a[this.order.browniesMode] - b[this.order.browniesMode]) * orderedBy);
          break;
        case 'alpha':
        // alphabetic sort
          filtered.sort((a, b) => (a['username'].toLowerCase().charCodeAt(0) - b['username'].toLowerCase().charCodeAt(0)) * -orderedBy);
          break;
        default:
      }
      let startIndex = (this.pagination.currentPage - 1) * this.pagination.perPage;
      if(Boolean(this.order.searchTerm)) {
        this.pagination.currentPage = 1;
        startIndex = 0;
      }
      return filtered.slice(startIndex, this.pagination.perPage * this.pagination.currentPage);
    },
    // dp: delta-page => 1 or -1
    paginate(dp) {
      let cp = this.pagination.currentPage;
      this.pagination.currentPage = Math.max(1, Math.min(this.pagination.lastPage, cp + dp));
    }
  },
  created() {
    this.getLeaderBoard();
  },
  mounted() {
    // listen to screen resize event
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    })
    this.$parent.$emit('board-mounted')
  }
}
</script>

<style scoped>
thead {
  font-family: 'Orbitron', sans-serif;
}
tbody {
  font-family: 'Slabo 27px', serif;
}
th {
  cursor: pointer;
}
.hr {
  border: 1px solid whitesmoke;
}
.level-fixed {
  height: 32px;
  width: 120px;
}
.level-fixed--img {
  height: 32px;
  width: 32px;
}
.pagination-list {
  font-family: 'Orbitron', sans-serif;
}
.pagination-list span {
  margin-left: 2px;
  margin-right: 2px;
}
@media screen and (max-width: 460px){
  table {
    font-size: 12px;
  }
}
</style>