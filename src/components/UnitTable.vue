<template>
    <h3> this is the unit table</h3>
    <table class="unit-table">
        <thead>
            <tr>
                <th>Unit ID</th>
                <th>Unit CC Faction</th>
                <th>Unit Atilla Faction</th>
                <th>Unit CC Name</th>
                <th>Unit Atilla Name</th>
                <th>Unit Type</th>
                <th>Unit Upkeep</th>
            </tr>
            <tr v-for="units of clancraftUnits" :key="units['CC Units']">
                <td>{{ units['ID'] }}</td>
                <td>{{ units['CC Faction'] }}</td>
                <td>{{ units['Atilla Faction'] }}</td>
                <td>{{units['CC Units']}}</td>
                <td>{{ units['Atilla Units'] }}</td>
                <td>{{ units['Tier'] }}</td>
                <td>{{ calculateUpkeep(units.Tier,unitUpkeep) }}</td>
            
            </tr>
        </thead>
    </table>
</template>
<script>


export default{
    inject:['clancraftUnits','calculateUpkeep','unitUpkeep']
}
</script>

<style scoped>
    .unit-table{
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
