<template>
     <div class="w-full h-fit flex">
    <div class="w-96 mt-1 mb-2">
   <h3 class="px-2 text-lg text-white bg-black">Special Unit Form</h3>
    <form  class="border border-black px-1" @submit.prevent="submitForm">
        <div class=" border border-black px-2 py-2 my-2 mx-1">
        <h3 class=" font-bold text-lg mb-1">Structure</h3>
        <div class="form-control mt-1">
           
        </div>
        <div class="form-control mt-1">
            <label for="unit-structure" class="mr-16">CC Faction</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['CC Faction']" id="unit-clancraft-faction">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">Atilla Faction</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['Atilla Faction']" id="unit-atilla-faction">
        </div>
       
        <div class="form-control mt-1">
            <label for="unit-structure" class="mr-[74px]">Structure</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit.structure" id="unit-tier">
        </div>
        <div class="form-control my-1">
            <label for="unit-sub-structure" class="mr-10">Sub-Structure</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit.subStructure" id="unit-sub-structure">
        </div>
    </div> 
    <div class="border border-black px-2 py-2 my-3 mx-1">
        <h3 class=" font-bold text-lg mb-1">Unit Details</h3>
        <div class="form control mt-1">
            <label for="unit-name" class="mr-[15px]">Unit Name</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit.name" id="unit-name"/>
        </div>
        <div class="form-control mt-1">
            <label for="unit-structure" class="mr-[67px]">Tier</label>
            <select class="border border-black px-2" v-model.trim="selectedUnit.tier" id="unit-structure">
                <option v-for="level in unitTierLevel" :value="level" :key="level">{{ level }}</option>   
            </select>
            <select class="border border-black px-2" v-model.trim="selectedUnit.type" id="unit-structure">
                <option v-for="tier in unitType" :value="tier" :key="tier">{{ tier }}</option>   
            </select>
        </div>
           <div class="form-control mt-1">
            <label for="unit-st" class="mr-10">CC Unit</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['CC Units']" id="unit-clancraft-name">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-6">Atilla Unit</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['Atilla Units']" id="unit-atilla-units">
        </div>
           
          
        <div class="form-control mt-1">
            <label for="unit-upkeep" class="mr-10">Upkeep</label>
            <input type="text" class="border text-center border-black px-2 w-16 mr-2" v-model.number="selectedUnit.upkeep" id="unit-atilla-faction">
            <span class="text-lg font-semibold">{{ baseUnit }}</span>
        </div>
      
    </div>
       
       
       
         <h4 class="font-lg mt-1 font-semibold ml-1">Total Recruitment Cost: {{totalRecruitmentCost}} {{ baseUnit }}</h4>
          <h4 class="font-lg mt-1 font-semibold ml-1">New Upkeep Cost: {{ totalUpkeepCost}} {{ baseUnit }}</h4>
        <button class="ml-1 active:font-bold active:bg-green-300 px-2 text-white border h-12 bg-green-500 hover:bg-green-400 hover:font-semibold border-black my-2 mr-2" type="button" @click="addUnit">Add Unit</button>
        <button class="ml-1 active:font-bold active:bg-sky-300 px-2 text-white border bg-sky-500 hover:bg-sky-400 hover:font-semibold border-black border-lg h-12 ">Submit</button>
    </form>
</div>
<div class="flex-grow text-center mx-3" v-if="selectedUnits.length > 0">
      <h3 class="text-white bg-black text-lg text-bold">Generated Units</h3>
      <ul>
      <li v-for="unit in selectedUnits" class="border border-black px-2" :key="unit.Number">
        {{ unit.Name }} - {{ unit["CC Units"] }} - {{ unit["Atilla Units"] }} - {{ unit["CC Faction"] }} - {{ unit["Atilla Faction"] }} - {{ unit["Tier"] }}   {{ unit["structure"] !== '' ? ` - ${unit["structure"]}` : '' }} {{ unit["subStructure"] !== '' ? ` - ${unit["subStructure"]}` : '' }}
        <span class="cursor-pointer active:bg-red-300 grow border-sm mx-2 border-black" @click="deleteUnit(unit.Number)"><font-awesome-icon icon="fa-solid fa-trash" class="text-red-400 border"></font-awesome-icon></span>
    </li>
    </ul>
    </div>

      </div>
</template>

<script>
export default {
    emits:['submit'],
    props:['baseUnit'],
    inject:['findRecruitmentCost','recruitmentCost'],
    data(){
        return{
            selectedUnits: [],
            selectedUnit:{
                name:'',
                structure:'',
                subStructure:'',
                "CC Units": '',
                "Atilla Units": '',
                Tier: [],
                "CC Faction":'',
                "Atilla Faction": '',
                upkeep: 0
            }
        }
    },
    computed:{
    totalRecruitmentCost(){
            const recruitmentCosts = this.selectedUnits.map(unit=> this.findRecruitmentCost(unit.Tier,this.recruitmentCost));
           return recruitmentCosts.reduce((sum,nextUnitCost) => sum + nextUnitCost,0 )
        },
        totalUpkeepCost(){
         const upkeepCosts = this.selectedUnits.map(unit => unit.BaseUpkeep)
         return upkeepCosts.reduce((sum,nextUpkeep)=> sum+ nextUpkeep,0)
        },
     unitTierLevel(){
         const unitList = {...this.recruitmentCost}
         let unitLevels = [];
         for(let key in unitList){
            const splitKey = key.split(' ');
            let level = splitKey[0].concat(' ',splitKey[1])
            unitLevels.push(level);
         }
         return  [...new Set(unitLevels)];
     },
     unitType(){
        const unitList = {...this.recruitmentCost}
         let unitTypes = [];
         for(let key in unitList){
            const splitKey = key.split(' ');
            let types = splitKey[2].concat(' ',splitKey[3])
            unitTypes.push(types);
         }
         return  [...new Set(unitTypes)];
     }
    },
    methods:{
        submitForm(){
            this.$emit('submit',this.selectedUnits)
            this.selectedUnits = []
            this.selectedUnit = {
                name:'',
                structure:'',
                subStructure:'',
                "CC Units": '',
                "Atilla Units": '',
                tier:'',
                type:'',
                "CC Faction":'',
                "Atilla Faction": '',
            }
        },
        addUnit(){
            let startingIndex = this.selectedUnits.length 
            let newUnit = {
                ...this.selectedUnit,
                Number: startingIndex,
                Name: this.selectedUnit.name,
                Structure: this.selectedUnit.structure,
                SubStructure: this.selectedUnit.subStructure,
                BaseUpkeep: this.selectedUnit.upkeep,
                Tier: this.selectedUnit.tier+' '+this.selectedUnit.type
            }
            this.selectedUnits.push(newUnit)
          
            this.selectedUnit= {
                ...this.selectedUnit,
                name:'',
                "CC Units": '',
                "Atilla Units": '',
                type:'',
                tier:'',
                upkeep: 0
            }
           
        },
        deleteUnit(targetUnitId){
            const newUnits = [...this.selectedUnits]
            const targetUnitIdx = newUnits.findIndex(unit=> unit.Number == targetUnitId)
            newUnits.splice(targetUnitIdx,1)
            this.selectedUnits = newUnits;
        }
    }
}
</script>