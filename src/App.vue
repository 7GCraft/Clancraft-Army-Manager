<template>
  <h1> remember the new days</h1>
  <RouterView/>
  <army-table></army-table>
</template>

<script>
import clancraftUnits from './CC_UNITS.json'
import unitUpkeep from './UNIT_UPKEEP.json'
import {calculateUpkeep} from './helper'
import ArmyTable from './components/ArmyTable.vue'
export default {
  name: 'App',
  components: {
    ArmyTable
  },
  created(){

  },
  provide(){
    return{
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
