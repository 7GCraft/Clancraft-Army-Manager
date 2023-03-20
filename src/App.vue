<template>
  <TheNavigation></TheNavigation>
  <router-view> </router-view>
</template>

<script>
import clancraftUnits from './CC_UNITS.json'
import unitUpkeep from './UNIT_UPKEEP.json'
import StateList from './STATE_ID.json'
import {calculateUpkeep} from './helper'
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
      calculateUpkeep: calculateUpkeep,
      clancraftUnits : clancraftUnits,
      unitUpkeep: unitUpkeep
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
