<template>
  <div>
    <table ref="armyTable" class="army-table text-sm" @keydown.esc="cancelEdit">
      <thead v-if="this.armyList.length > 0">
        <tr>
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
          <th @click="toggleLocationStatus" class="hover:bg-green-300 active:bg-green-200">Location Status</th>
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
            <tr  v-for="(unit, unitIdx) of armyUnits" :key="unit.Name">
              <td @click="highlightRow($event)">{{ unit.Number }}</td>
              <td   :class="{ 'bg-blue-100': unit.Tier.includes('Ship') }" @dblclick="selectDataCellToEdit(unit, 'Name')">
                <input
                  class="w-72 px-2 mx-1"
                  :value="unit.Name"
                  @keydown.enter="saveEdit($event, unit, 'Name')"
                  v-if="checkIfUnitAndAttributeSelected(unit, 'Name')"
                  type="text"
                />
                <template v-else>{{ unit.Name }}</template>
              </td>
              <td>{{ unit['Atilla Faction'] }}</td>
              <td>{{ unit['Atilla Units'] }}</td>
              <td>{{ unit.ID }}</td>
              <td>{{ unit.Tier }}</td>
              <td @dblclick="selectDataCellToEdit(unit, 'Size')">
                <input
                  class="w-16 px-1"
                  :value="unit.Size"
                  @keydown.enter="saveEdit($event, unit, 'Size')"
                  v-if="checkIfUnitAndAttributeSelected(unit, 'Size')"
                  type="number"
                />
                <template v-else>{{ unit.Size }}</template>
              </td>
              <td>{{ calculateUnitSize(unit.Tier) }}</td>
              <td>{{ unit.BaseUpkeep }}</td>
              <td @dblclick="selectDataCellToEdit(unit, 'upkeepModifier')">
                <input
                  class="w-16 px-1 mx-1"
                  :value="unit.upkeepModifier"
                  @keydown.enter="saveEdit($event, unit, 'upkeepModifier')"
                  v-if="checkIfUnitAndAttributeSelected(unit, 'upkeepModifier')"
                  type="number"
                />
                <template v-else>{{ unit.upkeepModifier }}</template>
              </td>
              <td>
                {{
                  (calculateUpkeep(unit.BaseUpkeep, unit.upkeepModifier) *
                    unit.Size) /
                  calculateUnitSize(unit.Tier)
                }}
              </td>
              <td @click="changeUnitLocalStatus(unit)">
              <button class="w-full h-full p-2 hover:bg-green-400 active:bg-green-300">
               {{ unit.localStatus }}
              </button>
              </td>
              <td @click=" highlightRow($event,'SubStructure')" v-if="unitIdx === 0" :rowspan="armyUnits.length">
                {{ subStructure }}
              </td>
              <td @click=" highlightRow($event,'Structure')"
                v-if="subStructureIdx === 0 && unitIdx === 0"
                :rowspan="calculateGroupRowspan(groupedArmy)"
              >
                {{ structure }}
              </td>
              <td
                class="cursor-pointer active:bg-red-300"
                @click="deleteRow(unit)"
              >
                <font-awesome-icon
                  icon="fa-solid fa-trash"
                  class="text-red-400 border"
                ></font-awesome-icon>
              </td>
            </tr>
          </template>
        </template>
      </thead>
    </table>

    <h2 class="font-bold text-xl my-1" v-if="this.armyList.length > 0">
      Total upkeep: {{ totalUpkeep }} {{ baseUnit }}
    </h2>

    <Teleport to="#app">
      <button
        v-if="this.armyList.length > 0"
        @click="exportTable"
        class="group h-24 text-xl sticky bottom-0 left-1/2 border-2 border-gray-200 shadow-lg border-b-0 hover:bg-green-200 border-black bg-white text-white flex items-center px-8 py-3 space-x-5"
        type="button"
      >
        <font-awesome-icon
          class="text-5xl text-green-500"
          icon="fa-solid fa-file-excel"
        ></font-awesome-icon>
        <h3 class="group-hover:font-semibold text-black">Save to excel</h3>
      </button>
    </Teleport>
  </div>
  <transition name="fade-in">
    <user-alert :show="showAlert" @hide="showAlert = false">
      <template v-slot:title>Army data transported to Excel!</template>
      <template v-slot:body
        >The excel army data of state {{ armyName }} has been created in
        {{ armyName }}.xlsx</template
      >
    </user-alert>
  </transition>
</template>

<script>
import { groupBy } from '@/helper';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  props: ['armyList', 'baseUnit', 'armyName'],
  emits: ['deleteRow', 'updateRow','updateTable'],
  inject: ['findUpkeep', 'unitUpkeep', 'calculateUnitSize', 'calculateUpkeep'],
  data() {
    return {
      beforeEditUnit: null,
      selectedEditAttribute: null,
      tableData: [],
      showAlert: false,
      selectedUnitIndexes: [],
    };
  },
  computed: {
   
    groupedArmyList: function () {
      if (this.armyList.length == 0) {
        return {};
      }

      const firstGroupArmyList = Object.entries(
        groupBy(this.armyList, 'Structure')
      );
      const secondGroupArmyList = firstGroupArmyList.map(groupedArmy => {
        return [groupedArmy[0], groupBy(groupedArmy[1], 'SubStructure')];
      });
      return Object.fromEntries(secondGroupArmyList);
    },
    totalUpkeep() {
      return this.armyList.reduce(
        (sum, unit) =>
          sum +
          this.calculateUpkeep(unit.BaseUpkeep, unit.upkeepModifier) *
            (unit.Size / this.calculateUnitSize(unit.Tier)),
        0
      );
    },
  },
  methods: {
    toggleLocationStatus(){
      console.log(this.selectedUnitIndexes,'langus')
      let newArmyList
      if(this.selectedUnitIndexes.length <= 0){
        newArmyList = this.armyList.map(unit => this.changeUnitLocalStatus(unit))
        console.log(newArmyList[0].localStatus,'takusada')
      }else{
         newArmyList = [...this.armyList]
       
       for(let index of this.selectedUnitIndexes){
         let targetUnit = newArmyList.find(unit=> unit.Number == index)
        targetUnit = this.changeUnitLocalStatus(targetUnit)
       }
       this.$emit('updateTable',newArmyList)
      }

    },
    highlightRow(evt,mode){
      if(mode === 'Structure' || mode === 'SubStructure'){
        let targetRow = evt.target;
        targetRow.classList.toggle('bg-red-100')
        let targetOrganization = evt.target.innerHTML
        console.log(this.armyList)
        let targetUnitIndexes = this.armyList.filter(unit=> unit[mode] == targetOrganization).map(unit=> unit.Number)
        console.log('targetus indexus',targetUnitIndexes)
        console.log('organi',targetOrganization)
      }else{
        let targetRow = evt.target.parentNode
      let targetUnitNumber = +evt.target.innerHTML
      console.log(this.selectedUnitIndexes,'begin')
      targetRow.classList.toggle('bg-red-100')
      if(this.selectedUnitIndexes.includes(targetUnitNumber)){
        const index = this.selectedUnitIndexes.indexOf(targetUnitNumber)
        this.selectedUnitIndexes.splice(index,1)
        console.log(index,'indexus')
        console.log(this.selectedUnitIndexes,'HALABLOS')
      }else {
        this.selectedUnitIndexes.push(targetUnitNumber)
        console.log(this.selectedUnitIndexes,'HALABLOS')
      }
      }
   
      


    },
    changeUnitLocalStatus(unit){
      console.log(unit,'russian unification')
      if(unit.localStatus === 'F'){
        unit.localStatus ='A'
      }else if(unit.localStatus === 'A'){
        unit.localStatus = 'E'
      }else{
        unit.localStatus = 'F'
      }
      return unit
     
    },
    callUpdateRow(newRow){
      this.$emit('updateRow',newRow);
    },
    calculateGroupRowspan(groupedArmy) {
      return Object.values(groupedArmy).reduce(
        (totalUnits, units) => totalUnits + units.length,
        0
      );
    },
    cancelEdit() {
      this.beforeEditUnit = null;
      this.selectedEditAttribute = null;
    },
    saveEdit(evt, unit, targetAttribute) {
      let newUnit = { ...unit };
      console.log('kruyoso"s dream', evt);
      console.log('adraso"s death we mourn', unit);
      console.log('Turlan is the most superior race', targetAttribute);
      newUnit[targetAttribute] = evt.target.value;
      this.callUpdateRow(newUnit)

      this.beforeEditUnit = null;
      this.selectedEditAttribute = null;
    },
    checkIfUnitAndAttributeSelected(unit, attribute) {
      if (this.beforeEditUnit == null || this.selectedEditAttribute == null) {
        return false;
      }

      return (
        this.beforeEditUnit.Number == unit.Number &&
        this.selectedEditAttribute == attribute
      );
    },
    deleteRow(unit) {
      this.$emit('deleteRow', unit.Number);
    },
    selectDataCellToEdit(unit, attribute) {
      this.beforeEditUnit = JSON.parse(JSON.stringify(unit));
      this.selectedEditAttribute = attribute;
    },
    exportTable() {
      const worksheet = XLSX.utils.table_to_sheet(this.$refs.armyTable);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `${this.armyName}`);
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const excelBlob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(excelBlob, `${this.armyName}.xlsx`);
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
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
