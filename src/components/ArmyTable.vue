<template>
    <h3> this is the unit table</h3>
    <table class="army-table">
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
            </tr>
            <template v-for="(groupedArmy, structure) in groupedArmyList" :key="structure">
               <template v-for="(armyUnits, subStructure, subStructureIdx) in groupedArmy" :key="subStructure">
                  <tr v-for="(unit, unitIdx) of armyUnits" :key="unit.Number">
                     <td>{{ unit.Number }}</td>
                     <td>{{ unit.Name }}</td>
                     <td>{{ unit['Atilla Units'] }}</td>
                     <td>{{ unit.ID }}</td>
                     <td>{{ unit.Tier }}</td>
                     <td>{{ unit.Size }} </td>
                     <td>{{ calculateUnitSize(unit.Tier) }}</td>
                     <td>{{ unit.BaseUpkeep }}</td>
                     <td>{{ unit.upkeepModifier }}</td>
                     <td>{{ calculateUpkeep(unit.BaseUpkeep,unit.upkeepModifier) }}</td>
                     <td>{{ unit.localStatus }}</td>
                     <td v-if="unitIdx === 0" :rowspan="armyUnits.length">{{ subStructure }}</td>
                     <td
                        v-if="subStructureIdx === 0 && unitIdx === 0"
                        :rowspan="calculateGroupRowspan(groupedArmy)"
                     >
                        {{ structure }}
                     </td>
                  </tr>
               </template>
            </template>
        </thead>
    </table>
</template>
<script>
import { groupBy } from '@/helper';




export default{
    props:['armyList'],
    inject:['findUpkeep','unitUpkeep','calculateUnitSize','calculateUpkeep'],
    computed: {
        groupedArmyList: function () {
            if (this.armyList.length == 0) {
                return {};
            }

            const firstGroupArmyList = Object.entries(groupBy(this.armyList, "Structure"));
            const secondGroupArmyList = firstGroupArmyList.map((groupedArmy) => {
                return [groupedArmy[0], groupBy(groupedArmy[1], "SubStructure")];
            });
            return Object.fromEntries(secondGroupArmyList);
        },
    
       
    },
    methods: {
        calculateGroupRowspan(groupedArmy){
           return Object.values(groupedArmy).reduce((totalUnits, units) => totalUnits + units.length, 0)
        }
    }
}
</script>
<style scoped>
    .army-table{
        width:100%;
        border: 2px solid;
    }
    th{
        height: 20px;
        text-align: center;
        border: 2px solid;
    }
    td{
        height:20px;
        text-align:center;
        border: 2px solid;
        

    }
</style>