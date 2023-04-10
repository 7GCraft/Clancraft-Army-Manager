<template>
     <div class="w-full h-fit flex">
    <div class="w-96 mt-1 mb-2">
   <h3 class="px-2 text-lg text-white bg-black">Special Unit Form</h3>
    <form  class="border border-black px-1" @submit.prevent="submitForm">
         <div class="form-control mt-1">
           
        </div>
       
           <div class="form-control mt-1">
            <label for="unit-st" class="mr-12">CC Unit</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['CC Units']" id="unit-clancraft-name">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">Atilla Unit</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['Atilla Units']" id="unit-atilla-units">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">Tier</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit.Tier" id="unit-tier">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">CC Faction</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['CC Faction']" id="unit-clancraft-faction">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">Atilla Faction</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['Atilla Faction']" id="unit-atilla-faction">
        </div>
        <div class="form-control mt-1">
            <label for="unit-upkeep" class="mr-12">Upkeep Cost</label>
            <input type="text" class="border border-black px-2" v-model.number="selectedUnit.upkeep" id="unit-atilla-faction">
        </div>
        <div class="form control mt-1">
            <label for="unit-name" class="mr-9">Unit Name</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit.name" id="unit-name"/>
        </div>
        <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">Structure</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit.structure" id="unit-structure">
        </div>
        <div class="form-control mt-1">
            <label for="unit-sub-structure" class="mr-4">Sub-Structure</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit.subStructure" id="unit-sub-structure">
        </div>
       
         <h4 class="font-lg mt-1 font-semibold">Total Recruitment Cost: {{totalRecruitmentCost}} {{ baseUnit }}</h4>
          <h4 class="font-lg mt-1 font-semibold">New Upkeep Cost: {{ totalUpkeepCost}} {{ baseUnit }}</h4>
        <button class="active:font-bold active:bg-green-300 px-2 text-white border h-12 bg-green-500 hover:bg-green-400 hover:font-semibold border-black my-2 mr-2" type="button" @click="addUnit">Add Unit</button>
        <button class="active:font-bold active:bg-sky-300 px-2 text-white border bg-sky-500 hover:bg-sky-400 hover:font-semibold border-black border-lg h-12 ">Submit</button>
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
                Tier: '',
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
                Tier: '',
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
                BaseUpkeep: this.selectedUnit.upkeep
            }
            this.selectedUnits.push(newUnit)
          
            this.selectedUnit= {
                name:'',
                "CC Units": '',
                "Atilla Units": '',
                Tier: '',
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