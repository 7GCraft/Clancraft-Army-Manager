<template>
  <div class="h-screen">
    <TheNavigation></TheNavigation>
  <router-view> </router-view> 
  </div>

</template>

<script>
import clancraftUnits from './CC_UNITS.json';
import unitUpkeep from './UNIT_UPKEEP.json';
import StateList from './STATE_ID.json';
import currency from './CURRENCY.json';
import recruitmentCost from './UNIT_RECRUITMENT.json';
import {
  calculateUpkeep,
  calculateUnitSize,
  findBaseUpkeep,
  findRecruitmentCost,
  generateOrdinalIndicator,
} from './helper';
import TheNavigation from './components/TheNavigation.vue';
export default {
  name: 'App',
  components: {
    TheNavigation,
  },
  created() {},
  provide() {
    return {
      stateList: StateList,
      findUpkeep: findBaseUpkeep,
      calculateUpkeep: calculateUpkeep,
      clancraftUnits: clancraftUnits,
      unitUpkeep: unitUpkeep,
      calculateUnitSize: calculateUnitSize,
      findRecruitmentCost: findRecruitmentCost,
      recruitmentCost: recruitmentCost,
      generateOrdinalIndicator,
      currency,
    };
  },
};
</script>

<style>
body {
  margin: 0px 5px;
}
</style>
