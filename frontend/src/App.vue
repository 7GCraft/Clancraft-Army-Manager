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
import axios from 'axios'
import {
  calculateUpkeep,
  calculateUnitSize,
  findBaseUpkeep,
  findRecruitmentCost,
  generateOrdinalIndicator,
  sortObjectKeys
} from './helper';
import TheNavigation from './components/TheNavigation.vue';
export default {
  name: 'App',
  components: {
    TheNavigation,
  },
  created() {
    this.getStateList()
    this.$store.dispatch('getStateData')
    console.log(this.$store,'store to buy')
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
 
      sortObjectKeys
    };
  },
  data(){
    return{
      stateList : [],
      stateMap : [],
      currency:[]
    }
  },
  methods:{
 
    async getStateList(){
      let response;
      try{
        response = await axios.get('http://localhost:3000/api/get-state-list')
      }catch(err){
        throw new Error(err)
      }
      if ((response.status <= 200) & (response.status >= 300)) {
        throw Error('Failed to save army data!');
      }
      const responseData = response.data;
      this.stateList = responseData.armyData
      this.stateMap = responseData.armyMap
      this.currency = responseData.currency
      localStorage.setItem('state-list',JSON.stringify(responseData.armyData))
      localStorage.setItem('state-map',JSON.stringify(responseData.armyMap))
      localStorage.setItem('currency',JSON.stringify(responseData.currency))
      console.log('first',this.stateList)
      console.log('KAMAMAMA',JSON.parse(localStorage.getItem('currency')))
      console.log('second',this.stateMap)
      console.log('third',this.currency)
     
    }
  }
};
</script>

<style>
body {
  margin: 0px 5px;
}
</style>
