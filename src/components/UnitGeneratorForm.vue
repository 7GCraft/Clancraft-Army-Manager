<template>
  <form>
    <h3>Unit Generator</h3>
    <div class="form-control">
      <label for="normal">Normal</label>
      <input type="radio" value="normal" v-model="mode" name="normal" />
      <label for="feudal">Feudal</label>
      <input type="radio" value="feudal" name="feudal" v-model="mode" />
    </div>
    <input type="number" v-model="generationSize" />
    <div class="form-control" >
        <input type="text" name="structure" v-model.trim="generatedArmyStructure"/>
        <label for="structure">Army Structure</label>
    </div>
    <div class="form-control" >
        <input type="text" name="subStructure" v-model.trim="generatedArmySubStructure"/>
        <label for="subStructure">Army Sub Structure</label>
    </div>
    <button type="button" @click="generateUnitBasedOnMode(mode)">
      Generate units
    </button>
    <ul>
      <li v-for="unit in generatedUnits" :key="unit.Number">
        {{ unit.Name }} - {{ unit["CC Units"] }} - {{ unit["Atilla Units"] }} {{ unit["SubStructure"] !== '' ? ` - ${unit["SubStructure"]}` : '' }} {{ unit["Structure"] !== '' ? ` - ${unit["Structure"]}` : '' }}
      </li>
    </ul>
    <button type="button" @click="addUnits">
      click to add generated unit.
    </button>
    <button type="button" @click="replaceUnits">Click to replace unit with generated units.</button>
  </form>
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