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
               
            </tr>
            <tr v-for="unit of armyList" :key="unit.number">
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
            </tr>
        </thead>
    </table>
</template>
<script>




export default{
    props:['armyList'],
    inject:['calculateUpkeep','unitUpkeep']
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