<template>
     <div class="w-full h-fit flex">
    <div class="w-96 mt-1 mb-2">
   <h3 class="px-2 text-lg text-white bg-black">Special Unit Form</h3>
    <form  class="border border-black px-1">
         <div class="form-control mt-1">
           
        </div>
        <div class="form control mt-1">
            <label for="unit-name" class="mr-9">Unit Name</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit.name" id="unit-name"/>
        </div>
           <div class="form-control mt-1">
            <label for="unit-st" class="mr-12">CC Unit</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['CC Units']" id="unit-clancraft-name">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">Atilla Unit</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['Atilla Units']" id="unit-structure">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">Tier</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit.Tier" id="unit-structure">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">CC Faction</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['CC Faction']" id="unit-structure">
        </div>
           <div class="form-control mt-1">
            <label for="unit-structure" class="mr-12">Atilla Faction</label>
            <input type="text" class="border border-black px-2" v-model.trim="selectedUnit['Atilla Faction']" id="unit-structure">
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
<div class="flex-grow text-center mx-3">
     
    </div>


      </div>
</template>

<script>
export default {
    data(){
        return{
            selectedUnit:{

            }
        }
    }
}
</script>