<template>
  <div class="min-h-screen">
    <TheNavigation @replenish-units="replenishAllUnits"></TheNavigation>
    <router-view> </router-view>
  </div>
</template>

<script>
import clancraftUnits from './CC_UNITS.json';
import unitUpkeep from './UNIT_UPKEEP.json';

import recruitmentCost from './UNIT_RECRUITMENT.json';

import {
  calculateUpkeep,
  calculateUnitSize,
  findBaseUpkeep,
  findRecruitmentCost,
  generateOrdinalIndicator,
  sortObjectKeys,
} from './helper';
import TheNavigation from './components/TheNavigation.vue';
export default {
  name: 'App',
  components: {
    TheNavigation,
  },
  created() {

    this.$store.dispatch('getStateData');
    console.log(this.$store, 'store to buy');
  },
  provide() {
    return {
      findUpkeep: findBaseUpkeep,
      calculateUpkeep: calculateUpkeep,
      clancraftUnits: clancraftUnits,
      unitUpkeep: unitUpkeep,
      calculateUnitSize: calculateUnitSize,
      findRecruitmentCost: findRecruitmentCost,
      recruitmentCost: recruitmentCost,
      generateOrdinalIndicator,

      sortObjectKeys,
    };
  },
  data() {
    return {
      stateList: [],
      stateMap: [],
      currency: [],
    };
  },

};
</script>

<style>
body {
  margin: 0px 5px;
}
</style>
