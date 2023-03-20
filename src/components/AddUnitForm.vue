<template>
    <form @submit.prevent="submitForm">
        <h3>Add unit form</h3>
        <div class="form-control">
            <select v-model="selectedUnit.ID" >
            <option v-for="unit in availableUnits" v-bind:key="unit.ID" :value="unit.ID">{{ unit['CC Units'] }}</option>
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
                    {{ unit['Name'] }} {{ unit['CC Units'] }} - {{ unit['SubStructure'] }} - {{ unit['Structure'] }}
                </li>
            </ul>
        </div>
        <button type="button" @click="addUnits">click to add unit</button>
        <button>Click to submit</button>
    </form>
</template>

<script>
export default {
    props:['armyName'],
    inject:['clancraftUnits'],
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
        availableUnits(){
            return this.clancraftUnits.filter(unit=> unit['CC Faction'] == this.armyName)
        }
    },
    methods:{
        submitForm(){
            console.log(this.clancraftUnits,this.armyName)
            this.$emit('submit',this.selectedUnits)
        },
        addUnits(){
            let targetUnit;
            for(let unit of this.clancraftUnits){
                if(unit.ID === this.selectedUnit.ID){
                    targetUnit = {
                        ...unit,
                        Name: this.selectedUnit.name,
                        Structure: this.selectedUnit.structure,
                        SubStructure: this.selectedUnit.subStructure
                    }
                }
            }
            console.log(targetUnit)
            this.selectedUnits.push(targetUnit)
        }
    }
}
</script>