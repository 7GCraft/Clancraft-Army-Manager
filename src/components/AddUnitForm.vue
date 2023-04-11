<template>
    <div class="w-full h-fit flex">
    <div class="w-96 mt-1 mb-2">
   <h3 class="px-2 text-lg text-white bg-black">Add Unit Form</h3>
    <form @submit.prevent="submitForm" class="border border-black px-2">
        <div class="form-control mt-1">
            <label for="unit-selection" class="mr-6">Select a unit</label>
            <select name="unit-selection"  v-model.trim="selectedUnit.ID" class="border-black border w-[200px]">
            <option v-for="unit in units" v-bind:key="unit.ID" :value="unit.ID">{{ unit['CC Units'] }}</option>
            </select>
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
        <button class="active:font-bold active:bg-green-300 px-2 text-white border h-12 bg-green-500 hover:bg-green-400 hover:font-semibold border-black my-2 mr-2" type="button" @click="addUnits">Add Unit</button>
        <button class="active:font-bold active:bg-sky-300 px-2 text-white border bg-sky-500 hover:bg-sky-400 hover:font-semibold border-black border-lg h-12 ">Submit</button>
    </form>
</div>
<div class="flex-grow text-center mx-3" v-if="selectedUnits.length > 0">
      <h3 class="text-white bg-black text-lg text-bold">Generated Units</h3>
      <ul>
      <li v-for="unit in selectedUnits" class="border border-black px-2" :key="unit.Number">
        {{ unit.Name }} - {{ unit["CC Units"] }} - {{ unit["Atilla Units"] }} {{ unit["SubStructure"] !== '' ? ` - ${unit["SubStructure"]}` : '' }} {{ unit["Structure"] !== '' ? ` - ${unit["Structure"]}` : '' }}
        <span class="cursor-pointer active:bg-red-300 grow border-sm mx-2 border-black" @click="deleteUnit(unit.Number)"><font-awesome-icon icon="fa-solid fa-trash" class="text-red-400 border"></font-awesome-icon></span>
    </li>
    </ul>
    </div>
      </div>
</template>

<script>
export default {
    emits:['submit'],
    props:['units','baseUnit'],
    inject:['clancraftUnits','findUpkeep','unitUpkeep','findRecruitmentCost','recruitmentCost'],
    data(){
        return{
            selectedUnits:[],
            selectedUnit:{
                ID:'',
                name:'',
                structure:'',
                subStructure:'',
            }
        }
    },
    computed: {
        totalRecruitmentCost(){
            const recruitmentCosts = this.selectedUnits.map(unit=> this.findRecruitmentCost(unit.Tier,this.recruitmentCost));
           return recruitmentCosts.reduce((sum,nextUnitCost) => sum + nextUnitCost,0 )
        },
        totalUpkeepCost(){
         const upkeepCosts = this.selectedUnits.map(unit => this.findUpkeep(unit.Tier, this.unitUpkeep))
         return upkeepCosts.reduce((sum,nextUpkeep)=> sum+ nextUpkeep,0)
        }
    },
    methods:{
        submitForm(){
            this.$emit('submit',this.selectedUnits)
            this.selectedUnits = []
            this.selectedUnit = {
                ID:'',
                name:'',
                structure:'',
                subStructure:'',
            }
        },
        addUnits(){
            let targetUnit;
            let startingIndex = this.selectedUnits.length 
            for(let unit of this.clancraftUnits){
                if(unit.ID === this.selectedUnit.ID){
                    targetUnit = {
                        ...unit,
                        Number: startingIndex,
                        Name: this.selectedUnit.name,
                        Structure: this.selectedUnit.structure,
                        SubStructure: this.selectedUnit.subStructure
                    }
                    startingIndex++
                }
            }
            this.selectedUnit.name = ''
            this.selectedUnits.push(targetUnit)
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