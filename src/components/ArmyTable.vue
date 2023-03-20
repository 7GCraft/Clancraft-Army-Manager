<template>
    <h3> this is the unit table</h3>
    <table class="army-table">
        <thead>
            <tr>
                <th>No.</th>
                <th>Unit Name</th>
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
                  <tr v-for="(unit, unitIdx) of armyUnits" :key="unit.number">
                     <td>{{ unit.Number }}</td>
                     <td>{{ unit.Name }}</td>
                     <td>{{ unit.ID }}</td>
                     <td>{{ unit.Tier }}</td>
                     <td>{{ unit.Tier.includes('Infantry') ? 160 : 80}}</td>
                     <td>{{ unit.maxSize }}</td>
                     <td>{{ calculateUpkeep('Tier I Axe Infantry',unitUpkeep) }}</td>
                     <td>{{ unit.upkeepModifier }}</td>
                     <td>{{ unit.totalUpkeep }}</td>
                     <td>{{ unit.localStatus }}</td>
                     <td v-if="unitIdx === 0" :rowspan="armyUnits.length">{{ subStructure }}</td>
                     <td
                        v-if="subStructureIdx === 0 && unitIdx === 0"
                        :rowspan="Object.values(groupedArmy).reduce((totalUnits, units) => totalUnits + units.length, 0)"
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
    inject:['calculateUpkeep','unitUpkeep'],
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