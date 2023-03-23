<template>
    <form @submit.prevent="generateUnits">
        <h3>Add unit form</h3>
        <div class="form-control">
            <select v-model="selectedUnit.ID" >
            <option v-for="unit in sortedAvailableUnits" v-bind:key="unit.ID" :value="unit.ID">{{ unit['CC Units'] }}</option>
            </select>
        </div>
        <div class="form control">
            <label for="unit-name">Unit Name</label>
            <input type="text" v-model="selectedUnit.name" id="unit-name"/>
        </div>
        <div class="form-control">
            <label for="unit-structure">Structure</label>
            <input type="text" v-model="selectedUnit.structure" id="unit-structure">
        </div>
        <div class="form-control">
            <label for="unit-sub-structure">Sub-Structure</label>
            <input type="text" v-model="selectedUnit.subStructure" id="unit-sub-structure">
        </div>
        <div>
            <ul>
                <li v-for="unit in selectedUnits" :key="unit['Name']">
                    {{ unit['Name'] }} - {{ unit['Atilla Units'] }} - {{ unit['SubStructure'] }} - {{ unit['Structure'] }}
                </li>
            </ul>
        </div>
         <h4>Recruitment cost: {{totalRecruitmentCost}}</h4>
        <button type="button" @click="replaceUnits">click to add generated unit.</button>
        <button type="button" >Click to replace unit with generated units.</button>
    </form>
</template>
