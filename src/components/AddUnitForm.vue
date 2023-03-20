<template>
    <form @submit.prevent="submitForm">
        <h3>Add unit form</h3>
        <div class="form-control">
            <select v-model="selectedUnit.ID" >
            <option v-for="unit in availableUnits" v-bind:key="unit.ID" :value="unit.ID">{{ unit['CC Units'] }}</option>
            </select>
        </div>
        <div class="form control">
            <input type="text" v-model="selectedUnit.name" name="unit-name"/>
            <label for="unit-name">Unit Name</label>
        </div>
        <div>
            <ul>
                <li v-for="unit in selectedUnits" :key="unit">{{ unit['CC Units'] }} {{ unit['Name'] }}</li>
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
                name:''
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
            this.$emit('submit',this.selectedUnits)
        },
        addUnits(){
            let targetUnit;
            for(let unit of this.clancraftUnits){
                if(unit.ID === this.selectedUnit.ID){
                    targetUnit = {...unit,Name: this.selectedUnit.name}
                }
            }
            console.log(targetUnit)
            this.selectedUnits.push(targetUnit)
        }
    }
}
</script>