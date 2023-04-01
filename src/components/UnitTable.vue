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
            <tr v-for="units of clancraftUnits" :key="units['CC Units']">
                <td>{{ units['ID'] }}</td>
                <td>{{ units['CC Faction'] }}</td>
                <td>{{ units['Atilla Faction'] }}</td>
                <td>{{units['CC Units']}}</td>
                <td>{{ units['Atilla Units'] }}</td>
                <td>{{ units['Tier'] }}</td>
                <td>{{ findUpkeep(units.Tier,unitUpkeep) }}</td>
            
            </tr>
        </thead>
    </table>
</template>
<script>


export default{
    inject:['clancraftUnits','findUpkeep','unitUpkeep']
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
