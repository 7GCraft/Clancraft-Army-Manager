<template>
  <div class="w-full flex h-fit">
    <div class="w-96">
      <h3 class="px-2 text-lg text-white bg-black">Unit Generator</h3>
      <form class="border border-black px-2" @submit.prevent="addUnits">
        <div class="form-control mt-1">
          <label class="mr-16">Mode </label>
          <input
            type="radio"
            class="mr-1"
            value="normal"
            v-model="mode"
            name="normal"
          />
          <label for="normal" class="mr-2">Normal</label>
          <input
            type="radio"
            class="mr-1"
            value="feudal"
            name="feudal"
            v-model="mode"
          />
          <label for="feudal" class="mr-1">Feudal</label>
          <input
            type="radio"
            class="mr-1"
            value="conscript"
            name="conscript"
            v-model="mode"
          />
          <label for="conscript" class="mr-1">Conscript</label>
        </div>
        <div class="form-control mt-2">
          <label for="size" class="mr-[89px]">Army Size</label>
          <input
            type="text"
            class="border text-center w-[42px] border-black"
            name="size"
            v-model.number="generationSize"
          />
          <label for="size" class="ml-1"> Units</label>
        </div>

        <div class="form-control mt-1">
          <label for="structure" class="mr-[53px]">Army Structure</label>
          <input
            type="text"
            class="border border-black px-2 w-42"
            name="structure"
            v-model.trim="generatedArmyStructure"
          />
        </div>
        <div class="form-control mt-1">
          <label for="subStructure" class="mr-16">Sub Structure</label>
          <input
            type="text"
            class="border border-black w-42 px-2"
            name="subStructure"
            v-model.trim="generatedArmySubStructure"
          />
        </div>
        <button
          class="active:font-bold active:bg-green-300 px-2 text-white border h-12 bg-green-500 hover:bg-green-400 hover:font-semibold border-black my-2 mr-2"
          type="button"
          @click="generateUnitBasedOnMode()"
        >
          Generate Unit
        </button>
        <button
          class="active:font-bold active:bg-sky-300 px-2 text-white border bg-sky-500 hover:bg-sky-400 hover:font-semibold border-black border-lg h-12"
          @click="addUnits"
        >
          Submit
        </button>
      </form>
    </div>
    <div class="flex-grow text-center mx-3">
      <h3 class="text-white bg-black text-lg text-bold">Generated Units</h3>
      <ul v-if="generatedUnits.length > 0">
        <li
          v-for="unit in generatedUnits"
          class="border border-black px-2"
          :key="unit.Number"
        >
          {{ unit.Name }} - {{ unit['CC Units'] }} - {{ unit['Atilla Units'] }}
          {{ unit['SubStructure'] !== '' ? ` - ${unit['SubStructure']}` : '' }}
          {{ unit['Structure'] !== '' ? ` - ${unit['Structure']}` : '' }}
          <span
            class="cursor-pointer active:bg-red-300 grow border-sm mx-2 border-black"
            @click="deleteUnit(unit.Number)"
            ><font-awesome-icon
              icon="fa-solid fa-trash"
              class="text-red-400 border"
            ></font-awesome-icon
          ></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { generateOrdinalIndicator } from '@/helper';
export default {
  props: ['units'],
  inject: ['generateOrdinalIndicator'],
  emits: ['add-units'],
  data() {
    return {
      generatedUnits: [],
      generationSize: 0,
      mode: 'normal',
      generatedArmyStructure: '',
      generatedArmySubStructure: '',
    };
  },
  computed: {
    totalRecruitmentCost() {
      const recruitmentCosts = this.selectedUnits.map(unit =>
        this.findRecruitmentCost(unit.Tier, this.recruitmentCost)
      );
      return recruitmentCosts.reduce(
        (sum, nextUnitCost) => sum + nextUnitCost,
        0
      );
    },
    totalUpkeepCost() {
      const upkeepCosts = this.selectedUnits.map(unit =>
        this.findUpkeep(unit.Tier, this.unitUpkeep)
      );
      return upkeepCosts.reduce((sum, nextUpkeep) => sum + nextUpkeep, 0);
    },
  },
  methods: {
    clearForm() {
      (this.generatedUnits = []), (this.generationSize = 0);
    },
    addUnitStructure(units) {
      if (this.generatedArmyStructure !== '') {
        for (let unit of units) {
          unit.Structure = this.generatedArmyStructure;
        }
      }
      if (this.generatedArmySubstructure !== '') {
        for (let unit of units) {
          unit.SubStructure = this.generatedArmySubStructure;
        }
      }
    },
    generateUnitBasedOnMode() {
      if (this.mode === 'feudal') {
        const nobleSize = Math.round((this.generationSize * 2) / 10);
        const levySize = Math.round((this.generationSize * 8) / 10);
        const nobleUnits = this.units.filter(unit => {
          return (
            unit.Tier.toLowerCase().includes('cavalry')||
            unit.Tier.toLowerCase().includes('tier ii')||
            unit.Tier.toLowerCase().includes('tier iii')
          );
        });
        const levyUnits = this.units.filter(unit => {
          return (
            !unit.Tier.toLowerCase().includes('cavalry') &&
            !unit.Tier.toLowerCase().includes('tier ii') &&
            !unit.Tier.toLowerCase().includes('tier iii')
          );
        });
        const nobleArmy = this.generateUnits(nobleUnits, nobleSize, 0);
        const levyArmy = this.generateUnits(
          levyUnits,
          levySize,
          nobleArmy.length
        );
        const combinedArmy = [...nobleArmy, ...levyArmy];
        this.addUnitStructure(combinedArmy);
        this.generatedUnits = [...this.generatedUnits, ...combinedArmy];
      } else if(this.mode === 'normal') {
        const newUnits = this.generateUnits(this.units, this.generationSize, 0);
        this.addUnitStructure(newUnits);
        this.generatedUnits = [...this.generatedUnits, ...newUnits];
      }else{
        console.log('we are here?')
        const conscriptUnits = this.units.filter(unit => {
          const name = unit['CC Units'].toLowerCase();
          return (
            !name.includes('samurai') &&
            !name.includes('noble') &&
            !name.includes('cavalry') &&
            !name.includes('knight') &&
            !unit.Tier.includes('Tier II') &&
            !unit.Tier.includes('Tier III') &&
            !unit.Tier.includes('cavalry')
          );
        });
        console.log(this.generationSize,'size matters?')
        const conscriptArmy = this.generateUnits(conscriptUnits,this.generationSize,0);
        this.addUnitStructure(conscriptArmy)
        this.generatedUnits = [...this.generatedUnits,...conscriptArmy]
      }

      this.mode = 'normal' 
      this.generationSize = 0;
      this.generatedArmyStructure = '';
      this.generatedArmySubStructure = '';
    },
    generateUnits(unitPool, size, startingIndex) {
      const newUnits = [];
      const units = unitPool.filter(unit => !unit.ID.includes('SG'));
      for (let i = 0; i < size; i++) {
        const unitNumber = i + 1 + startingIndex;
        const randomIndex = Math.floor(Math.random() * units.length);
        const newUnit = { ...units[randomIndex] };
        newUnit.Number = unitNumber;
        newUnit.Name = `${unitNumber}${generateOrdinalIndicator(
          unitNumber
        )} Unit of ${newUnit['CC Units']}`;

        newUnits.push(newUnit);
      }
      return newUnits;
    },
    addUnits() {
      this.$emit('add-units', this.generatedUnits);
      this.clearForm();
    },
    deleteUnit(targetUnitId) {
      const newUnits = [...this.generatedUnits];
      const targetUnitIdx = newUnits.findIndex(
        unit => unit.Number == targetUnitId
      );
      newUnits.splice(targetUnitIdx, 1);
      this.generatedUnits = newUnits;
    },
  },
};
</script>
