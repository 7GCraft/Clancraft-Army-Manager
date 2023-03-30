<template>
<div class="w-full flex h-fit">
   <div class="w-96">
      <h3 class="px-2 text-lg text-white bg-black">Unit Generator</h3>
  <form class="border border-black px-1" @submit.prevent="addUnits">
   
    <div class="form-control mt-1">
      <label class="mr-28">Mode </label>
      <input type="radio" class="mr-1" value="normal" v-model="mode" name="normal" />
      <label for="normal" class="mr-2">Normal</label>
      <input type="radio" class="mr-1" value="feudal" name="feudal" v-model="mode" />
      <label for="feudal" class="mr-1">Feudal</label>
    </div>
    <div class="form-control mt-2" >
        <label for="size" class="mr-[88px]">Army Size</label>
        <input type="text" class="border text-center w-[42px] border-black" name="size" v-model.number="generationSize"/>
        <label for="size" class="ml-1"> Units</label>
    </div>

    <div class="form-control mt-1" >
        <label for="structure" class="mr-[54px]">Army Structure</label>
        <input type="text" class="border border-black px-2 w-42" name="structure" v-model.trim="generatedArmyStructure"/>
    </div>
    <div class="form-control mt-1" >
        <label for="subStructure" class="mr-16">Sub Structure</label>
        <input type="text" class="border border-black w-42 px-2" name="subStructure" v-model.trim="generatedArmySubStructure"/>
    
    </div>
     <button class="px-2 text-white border h-12 bg-green-500 hover:bg-green-400 hover:font-semibold border-black my-2 mr-2" type="button" @click="generateUnitBasedOnMode()">Generate Unit</button>
        <button class="px-2 text-white border bg-red-500 hover:bg-red-400 hover:font-semibold border-black border-lg h-12" @click="addUnits">Submit</button>
  
  </form>
    
    </div>
    <div class="flex-grow text-center mx-3" v-if="generatedUnits.length > 0">
      <h3 class="text-white bg-black text-lg text-bold">Generated Units</h3>
      <ul>
      <li v-for="unit in generatedUnits" class="border border-black px-2" :key="unit.Number">
        {{ unit.Name }} - {{ unit["CC Units"] }} - {{ unit["Atilla Units"] }} {{ unit["SubStructure"] !== '' ? ` - ${unit["SubStructure"]}` : '' }} {{ unit["Structure"] !== '' ? ` - ${unit["Structure"]}` : '' }}
      </li>
    </ul>
    </div>
</div>
</template>
<script>
import { generateOrdinalIndicator } from "@/helper";
export default {
  props: ["units"],
  inject: ["generateOrdinalIndicator"],
  emits:['add-units'],
  data() {
    return {
      generatedUnits: [],
      generationSize: 0,
      mode: "normal",
      generatedArmyStructure: '',
      generatedArmySubStructure: ''
    };
  },
  methods: {
    clearForm(){
        this.generatedUnits = [],
        this.generationSize = 0;
    },
    addUnitStructure(units){
        if(this.generatedArmyStructure !== ''){
            for(let unit of units){
                unit.Structure = this.generatedArmyStructure;
            }
        }
        if(this.generatedArmySubstructure !== ''){
            for(let unit of units){
                unit.SubStructure = this.generatedArmySubStructure;
            }
        }
    },
    generateUnitBasedOnMode() {
       

      if (this.mode === "feudal") {
        const nobleSize = Math.round((this.generationSize * 2) / 10);
        const levySize = Math.round((this.generationSize * 8) / 10);
        const nobleUnits = this.units.filter((unit) => {
          const name = unit['CC Units'].toLowerCase();
          return (
            name.includes("samurai") ||
            name.includes("noble") ||
            name.includes("cavalry") ||
            name.includes("knight")
          );
        });
        const levyUnits = this.units.filter((unit) => {
        const name = unit['CC Units'].toLowerCase();
          return (
            !name.includes("samurai") &&
            !name.includes("noble") &&
            !name.includes("cavalry") &
            !name.includes("knight")
          );
        });
        const nobleArmy = this.generateUnits(nobleUnits,nobleSize,0)
        const levyArmy = this.generateUnits(levyUnits,levySize, nobleArmy.length)
        const combinedArmy = [...nobleArmy, ...levyArmy]
        this.addUnitStructure(combinedArmy)
        this.generatedUnits = [...this.generatedUnits, ...combinedArmy]
      } else {
          const newUnits = this.generateUnits(this.units,this.generationSize,0)
          this.addUnitStructure(newUnits)
        this.generatedUnits = [
            ...this.generatedUnits,
            ...newUnits
        ]
      }
      

      this.mode = "normal",
      this.generationSize = 0
      this.generatedArmyStructure = ""
      this.generatedArmySubStructure = ""
  
    },
    generateUnits(units, size, startingIndex) {
      const newUnits = [];
      for (let i = 0; i < size; i++) {
        const unitNumber = i + 1 + startingIndex;
        const randomIndex = Math.floor(Math.random() * units.length);
        const newUnit = { ...units[randomIndex] };
        newUnit.Number = unitNumber;
        newUnit.Name = `${unitNumber}${generateOrdinalIndicator(
          unitNumber
        )} Unit of ${newUnit["CC Units"]}`;

        newUnits.push(newUnit);
      }
      return newUnits
    },
    addUnits(){
        this.$emit('add-units',this.generatedUnits)
        this.clearForm()
    }
  },
};
</script>