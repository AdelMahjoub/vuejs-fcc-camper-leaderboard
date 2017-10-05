<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <form>
          <div class="control has-icons-right">
            <!-- search field -->
            <input
            v-model="order.searchTerm"
            class="input"
            type="text"
            placeholder="Search">
            <span class="icon is-small is-right">
              <i class="fa fa-search"></i>
            </span>
          </div>
        </form>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <div class="field has-addons">
          <div class="control">
            <a class="button is-static">Top of</a>
          </div>
          <div class="control">
            <span class="select">
              <!-- select ranking by alltime or recent -->
              <select
              @change="handleRankingModeChange" 
              v-model="order.rankingMode">
                <option
                :key="`filter-${index}`" 
                v-for="(rankingMode, index) in rankingModes"
                :value="rankingMode">{{ rankingMode | optionName }}</option>
              </select>
            </span>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="field has-addons">
          <div class="control">
            <a class="button is-static">Sort by</a>
          </div>
          <div class="control">
            <span class="select">
              <!-- select sort by brownies points or alphabetic-->
              <select v-model="order.sortTerm">
                <option
                :key="`sort-term-${index}`"
                v-for="(sortTerm, index) in sortTerms"
                :value="sortTerm">{{ sortTerm | optionName }}</option>
              </select>
            </span>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="control">
          <span class="icon">
            <!-- ascendant and descendant icons -->
            <i
            @click="order.reverse = !order.reverse"
            title="Ascendant" 
            v-show="!order.reverse" 
            class="fa fa-caret-square-o-up"></i>
            <i
            @click="order.reverse = !order.reverse"
            title="Descendant"
            v-show="order.reverse" 
            class="fa fa-caret-square-o-down"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'toolbar',
  filters: {
    optionName(string) {
      switch(string) {
        case 'alltime':
          return 'All time'
        case 'recent':
          return 'Last 30 days'
        case 'brownies':
          return 'Brownies';
        case 'alpha':
          return 'Alphabetic'
      }
    }
  },
  data() {
    return {
      order: store.order,
      rankingModes: store.rankingModes,
      sortTerms: store.sortTerms
    };
  },
  methods: {
    handleRankingModeChange() {
      this.$emit('get-ranking');
    }
  }
}
</script>

<style scoped>
.level {
  margin: 20px 0 40px 0;
  font-family: 'Orbitron', sans-serif;
}
span, label, a, input {
  font-size: 12px;
}
.fa-caret-square-o-down, .fa-caret-square-o-up {
  cursor: pointer;
}
</style>
