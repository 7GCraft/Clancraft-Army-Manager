<template>
    <h1 class=" text-white bg-black  text-center font-bold  py-3 text-2xl border border-black border-xl mb-2">
            Unit List
        </h1>
    <table class="unit-table text-sm">
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
            <tr v-for="unit of units" :key="unit['CC Units']">
                <td>{{ unit['ID'] }}</td>
                <td>{{ unit['CC Faction'] }}</td>
                <td>{{ unit['Atilla Faction'] }}</td>
                <td>{{unit['CC Units']}}</td>
                <td>{{ unit['Atilla Units'] }}</td>
                <td>{{ unit['Tier'] }}</td>
                <td>{{ findUpkeep(unit.Tier,unitUpkeep) }}</td>
            
            </tr>
        </thead>
    </table>
</template>
<script>


export default{
    props:['units'],
    inject:['findUpkeep','unitUpkeep']
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
