<template>
  <h3>this is the unit table</h3>
  <table class="army-table" @keydown.esc="cancelEdit" @keydown.enter="saveEdit">
    <thead>
      <tr>
        <th>No.</th>
        <th>Unit Name</th>
        <th>Atilla Name</th>
        <th>Unit ID</th>
        <th>Unit Type</th>
        <th>Unit Number</th>
        <th>Unit Maximum Number</th>
        <th>Base Upkeep</th>
        <th>Upkeep Modifier</th>
        <th>Unit Upkeep</th>
        <th>Location Status</th>
        <th>Army Sub-Structure</th>
        <th>Army Structure</th>
        <th>Delete Row</th>
      </tr>
      <template
        v-for="(groupedArmy, structure) in groupedArmyList"
        :key="structure"
      >
        <template
          v-for="(armyUnits, subStructure, subStructureIdx) in groupedArmy"
          :key="subStructure"
        >
          <tr v-for="(unit, unitIdx) of armyUnits" :key="unit.Number">
            <td>{{ unit.Number }}</td>
            <td @dblclick="selectDataCellToEdit(unit, 'Name')">
                <input v-model="unit.Name" v-if="checkIfUnitAndAttributeSelected(unit,'Name')" type="text">
                <template v-else>{{ unit.Name }}</template>
            </td>
            <td>{{ unit["Atilla Units"] }}</td>
            <td>{{ unit.ID }}</td>
            <td>{{ unit.Tier }}</td>
            <td @dblclick="selectDataCellToEdit(unit, 'Size')">
                <input v-model="unit.Size" v-if="checkIfUnitAndAttributeSelected(unit,'Size')" type="number">
                <template v-else>{{ unit.Size }}</template>
            </td>
            <td>{{ calculateUnitSize(unit.Tier) }}</td>
            <td>{{ unit.BaseUpkeep }}</td>
            <td @dblclick="selectDataCellToEdit(unit, 'UpkeepModifier')">
                <input v-model="unit.upkeepModifier" v-if="checkIfUnitAndAttributeSelected(unit,'UpkeepModifier')" type="number">
                <template v-else>{{ unit.upkeepModifier }}</template>
            </td>
            <td>{{ calculateUpkeep(unit.BaseUpkeep, unit.upkeepModifier) }}</td>
            <td @dblclick="selectDataCellToEdit(unit, 'LocalStatus')">
                <input v-model="unit.localStatus" v-if="checkIfUnitAndAttributeSelected(unit,'LocalStatus')" type="text">
                <template v-else>{{ unit.localStatus }}</template>
            </td>
            <td v-if="unitIdx === 0" :rowspan="armyUnits.length">
              {{ subStructure }}
            </td>
            <td
              v-if="subStructureIdx === 0 && unitIdx === 0"
              :rowspan="calculateGroupRowspan(groupedArmy)"
            >
              {{ structure }}
            </td>
            <td @click="deleteRow(unit)"><span>X</span></td>
          </tr>
        </template>
      </template>
    </thead>
  </table>
  <h2>Total upkeep: {{ totalUpkeep }}</h2>
</template>
<script>
import { groupBy } from "@/helper";

export default {
  props: ["armyList"],
  emits:["deleteRow","updateRow"],
  inject: ["findUpkeep", "unitUpkeep", "calculateUnitSize", "calculateUpkeep"],
  data() {
    return {
        modifiableArmyList: [],
        beforeEditUnit: null,
        selectedEditAttribute: null,
    }
  },
  mounted(){
    this.modifiableArmyList = JSON.parse(JSON.stringify(this.armyList));
  },
  computed: {
    groupedArmyList: function () {
      if (this.armyList.length == 0) {
        return {};
      }

      const firstGroupArmyList = Object.entries(
        groupBy(this.modifiableArmyList, "Structure")
      );
      const secondGroupArmyList = firstGroupArmyList.map((groupedArmy) => {
        return [groupedArmy[0], groupBy(groupedArmy[1], "SubStructure")];
      });
      return Object.fromEntries(secondGroupArmyList);
    },
    totalUpkeep() {
      return this.armyList.reduce((sum, unit) => sum + unit.BaseUpkeep, 0);
    },
  },
  methods: {
    calculateGroupRowspan(groupedArmy) {
      return Object.values(groupedArmy).reduce(
        (totalUnits, units) => totalUnits + units.length,
        0
      );
    },
    cancelEdit(){
        let selectedUnitIdx = this.modifiableArmyList.findIndex(unit => unit.Number == this.beforeEditUnit.Number);
        this.modifiableArmyList[selectedUnitIdx] = JSON.parse(JSON.stringify(this.beforeEditUnit));
        this.beforeEditUnit = null;
        this.selectedEditAttribute = null;
    },
    saveEdit(){
        this.$emit('updateRow',this.modifiableArmyList);

        this.beforeEditUnit = null;
        this.selectedEditAttribute = null;
    },
    checkIfUnitAndAttributeSelected(unit,attribute){
        if (this.beforeEditUnit == null || this.selectedEditAttribute == null){
            return false;
        }

        return this.beforeEditUnit.Number == unit.Number && this.selectedEditAttribute == attribute;
    },
    deleteRow(unit){
        this.$emit('deleteRow',unit.Number)
    },
    selectDataCellToEdit(unit,attribute){
        this.beforeEditUnit = JSON.parse(JSON.stringify(unit));
        this.selectedEditAttribute = attribute;
    }
  },
};
</script>
<style scoped>
.army-table {
  width: 100%;
  border: 2px solid;
}
th {
  height: 20px;
  text-align: center;
  border: 2px solid;
}
td {
  height: 20px;
  text-align: center;
  border: 2px solid;
}
</style>