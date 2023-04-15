<template>
  <div>
  <table ref="armyTable" class="army-table text-sm" @keydown.esc="cancelEdit" >
    <thead v-if="this.armyList.length > 0" >
      <tr >
        <th>No</th>
        <th>Unit Name</th>
        <th>Atilla Faction</th>
        <th>Atilla Name</th>
        <th>Unit ID</th>
        <th>Unit Type</th>
        <th>Unit Size</th>
        <th>Max Size</th>
        <th>Base Upkeep</th>
        <th>Modifier</th>
        <th>Unit Upkeep</th>
        <th>Location Status</th>
        <th>Army Sub-Structure</th>
        <th>Army Structure</th>
        <th>Delete Unit</th>
      </tr>

      <template
        v-for="(groupedArmy, structure) in groupedArmyList"
        :key="structure"
      >
        <template
          v-for="(armyUnits, subStructure, subStructureIdx) in groupedArmy"
          :key="subStructure"
        >
          <tr v-for="(unit, unitIdx) of armyUnits" :key="unit.Name">
            <td>{{ unit.Number }}</td>
            <td @dblclick="selectDataCellToEdit(unit, 'Name')">
                <input class="w-72 px-2 mx-1" :value="unit.Name" @keydown.enter="saveEdit($event,unit,'Name')" v-if="checkIfUnitAndAttributeSelected(unit,'Name')" type="text">
                <template v-else>{{ unit.Name }}</template>
            </td>
            <td>{{ unit['Atilla Faction'] }}</td>
            <td>{{ unit["Atilla Units"] }}</td>
            <td>{{ unit.ID }}</td>
            <td>{{ unit.Tier }}</td>
            <td @dblclick="selectDataCellToEdit(unit, 'Size')">
                <input class="w-16 px-1" :value="unit.Size" @keydown.enter="saveEdit($event,unit,'Size')" v-if="checkIfUnitAndAttributeSelected(unit,'Size')" type="number">
                <template v-else>{{ unit.Size }}</template>
            </td>
            <td>{{ calculateUnitSize(unit.Tier) }}</td>
            <td>{{ unit.BaseUpkeep }}</td>
            <td @dblclick="selectDataCellToEdit(unit, 'upkeepModifier')">
                <input class="w-16 px-1 mx-1" :value="unit.upkeepModifier" @keydown.enter="saveEdit($event,unit,'upkeepModifier')" v-if="checkIfUnitAndAttributeSelected(unit,'upkeepModifier')" type="number">
                <template v-else>{{ unit.upkeepModifier }}</template>
            </td>
            <td>{{ calculateUpkeep(unit.BaseUpkeep, unit.upkeepModifier) * unit.Size / calculateUnitSize(unit.Tier) }}</td>
            <td @dblclick="selectDataCellToEdit(unit, 'localStatus')">
                <input class="px-2 w-10" :value="unit.localStatus" @keydown.enter="saveEdit($event,unit,'localStatus')" v-if="checkIfUnitAndAttributeSelected(unit,'localStatus')" type="text">
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
            <td class="cursor-pointer active:bg-red-300" @click="deleteRow(unit)"><font-awesome-icon icon="fa-solid fa-trash" class="text-red-400 border"></font-awesome-icon></td>
          </tr>
        </template>
      </template>
    </thead>
  </table>
  
  <h2 class="font-bold text-xl my-1" v-if="this.armyList.length > 0">Total upkeep: {{ totalUpkeep }} {{baseUnit  }}</h2>
  <button v-if="this.armyList.length > 0" @click="exportTable" class="w-28 h-24 border my-2 mx-2 text-xl   border-black bg-green-700 text-white" type="button">Save to Excel.</button>
  </div>
  <transition name="fade-in">
  <user-alert :show="showAlert" @hide="showAlert = false">
    <template v-slot:title>Army data transported to Excel!</template>
    <template v-slot:body>The excel army data of state {{ armyName }} has been created in {{ armyName }}.xlsx</template>
  </user-alert>
</transition>
</template>

<script>
import { groupBy } from "@/helper";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  props: ["armyList","baseUnit",'armyName'],
  emits:["deleteRow","updateRow"],
  inject: ["findUpkeep", "unitUpkeep", "calculateUnitSize", "calculateUpkeep"],
  data() {
    return {
        beforeEditUnit: null,
        selectedEditAttribute: null,
        tableData: [],
        showAlert: false
    }
  },
  computed: {
    groupedArmyList: function () {
      if (this.armyList.length == 0) {
        return {};
      }

      const firstGroupArmyList = Object.entries(
        groupBy(this.armyList, "Structure")
      );
      const secondGroupArmyList = firstGroupArmyList.map((groupedArmy) => {
        return [groupedArmy[0], groupBy(groupedArmy[1], "SubStructure")];
      });
      return Object.fromEntries(secondGroupArmyList);
    },
    totalUpkeep() {
      return this.armyList.reduce((sum, unit) => sum + (( this.calculateUpkeep(unit.BaseUpkeep,unit.upkeepModifier))* (unit.Size / this.calculateUnitSize(unit.Tier))) , 0);
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
        this.beforeEditUnit = null;
        this.selectedEditAttribute = null;
    },
    saveEdit(evt,unit,targetAttribute){
        let newUnit = {...unit}
        console.log('kruyoso"s dream', evt)
        console.log('adraso"s death we mourn',unit)
        console.log('Turlan is the most superior race',targetAttribute)
        newUnit[targetAttribute] = evt.target.value;
        this.$emit('updateRow',newUnit);

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
    },
     exportTable() {
      const worksheet = XLSX.utils.table_to_sheet(this.$refs.armyTable);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `${this.armyName}`);
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(excelBlob, `${this.armyName}.xlsx`);
      this.showAlert = true;
      setTimeout(()=>{
        this.showAlert = false
      },5000)
    },
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