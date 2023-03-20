<template>
    <h3> this is the unit table</h3>
    <table class="army-table">
        <thead>
            <tr>
                <th>No.</th>
                <th>Unit Name</th>
                <th>Unit ID</th>
                <th>Unit Type</th>
                <th>Unit Tier</th>
                <th>Unit Number</th>
                <th>Unit Maximum Number</th>
                <th>Base Upkeep</th>
                <th>Upkeep Modifier</th>
                <th>Unit Upkeep</th>
                <th>Location Status</th>
               
            </tr>
            <tr v-for="unit of armyList" :key="unit.number">
               <td>{{ unit.number }}</td>
               <td>{{ unit.unitName }}</td>
               <td>{{ unit.unitID }}</td>
               <td>{{ unit.type }}</td>
               <td>{{ unit.tier }}</td>
               <td>{{ unit.size }}</td>
               <td>{{ unit.maxSize }}</td>
               <td>{{ unit.baseUpkeep }}</td>
               <td>{{ unit.upkeepModifier }}</td>
               <td>{{ unit.totalUpkeep }}</td>
               <td>{{ unit.localStatus }}</td>
            </tr>
        </thead>
    </table>
</template>
<script>


export default{
    props:['armyList']
  
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