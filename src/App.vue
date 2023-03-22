<template>
  <TheNavigation></TheNavigation>
  <router-view> </router-view>
</template>

<script>
import clancraftUnits from './CC_UNITS.json'
import unitUpkeep from './UNIT_UPKEEP.json'
import StateList from './STATE_ID.json'
import recruitmentCost from './UNIT_RECRUITMENT.json'
import {calculateUpkeep, calculateUnitSize, findBaseUpkeep,findRecruitmentCost} from './helper'
import TheNavigation from './components/TheNavigation.vue'
export default {
  name: 'App',
  components: {
    TheNavigation
},
  created(){

  },
  provide(){
    return{
      stateList: StateList,
      findUpkeep: findBaseUpkeep,
      calculateUpkeep: calculateUpkeep,
      clancraftUnits : clancraftUnits,
      unitUpkeep: unitUpkeep,
      calculateUnitSize: calculateUnitSize,
      findRecruitmentCost: findRecruitmentCost,
      recruitmentCost: recruitmentCost
    }
  },
  data(){
    return{
    }
  }
}
</script>

<style>
body {
  margin: 0px 5px;
}
</style>
