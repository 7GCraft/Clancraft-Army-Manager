<template>
    <form @submit.prevent="submitForm">
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
        <button type="button" @click="addUnits">click to add unit</button>
        <button>Click to submit</button>
    </form>
</template>

<script>
import { calculateUnitSize } from '@/helper'
export default {
    props:['armyName'],
    inject:['clancraftUnits','calculateUnitSize','findUpkeep','unitUpkeep'],
    data(){
        return{
            selectedUnits:[],
            selectedUnit:{
                ID:'',
                name:'',
                structure:'',
                subStructure:'',
            }
        }
    },
    computed: {
        sortedAvailableUnits(){
            const availableUnits = this.clancraftUnits.filter(unit=> unit['CC Faction'] == this.armyName);
            console.log(availableUnits)
            return availableUnits.sort((a, b) => a['CC Units'].localeCompare(b['CC Units']));
        }
    },
    methods:{
        submitForm(){
            this.$emit('submit',this.selectedUnits)
            this.selectedUnits = []
            this.selectedUnit = {
                ID:'',
                name:'',
                structure:'',
                subStructure:'',
            }
        },
        addUnits(){
            let targetUnit;
            for(let unit of this.clancraftUnits){
                if(unit.ID === this.selectedUnit.ID){
                    targetUnit = {
                        ...unit,
                        Size: calculateUnitSize(unit.Tier),
                        upkeepModifier: 0,
                        localStatus: "F",
                        BaseUpkeep: this.findUpkeep(unit.Tier,this.unitUpkeep),
                        Name: this.selectedUnit.name,
                        Structure: this.selectedUnit.structure,
                        SubStructure: this.selectedUnit.subStructure
                    }
                }
            }
            this.selectedUnit.name = ''
            this.selectedUnits.push(targetUnit)
        }
    }
}
</script>