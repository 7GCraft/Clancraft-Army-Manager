<template>
    <form @submit.prevent="submitForm">
        <h3>Add unit form</h3>
        <div class="form-control">
            <select v-model.trim="selectedUnit.ID" >
            <option v-for="unit in units" v-bind:key="unit.ID" :value="unit.ID">{{ unit['CC Units'] }}</option>
            </select>
        </div>
        <div class="form control">
            <label for="unit-name">Unit Name</label>
            <input type="text" v-model.trim="selectedUnit.name" id="unit-name"/>
        </div>
        <div class="form-control">
            <label for="unit-structure">Structure</label>
            <input type="text" v-model.trim="selectedUnit.structure" id="unit-structure">
        </div>
        <div class="form-control">
            <label for="unit-sub-structure">Sub-Structure</label>
            <input type="text" v-model.trim="selectedUnit.subStructure" id="unit-sub-structure">
        </div>
        <div>
            <ul>
                <li v-for="unit in selectedUnits" :key="unit['Name']">
                    {{ unit['Name'] }} - {{ unit['Atilla Units'] }} - {{ unit['SubStructure'] }} - {{ unit['Structure'] }}
                </li>
            </ul>
        </div>
         <h4>Recruitment cost: {{totalRecruitmentCost}}</h4>
        <button type="button" @click="addUnits">click to add unit</button>
        <button>Click to submit</button>
    </form>
</template>

<script>
export default {
    emits:['submit'],
    props:['units'],
    inject:['clancraftUnits','findUpkeep','unitUpkeep','findRecruitmentCost','recruitmentCost'],
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
        totalRecruitmentCost(){
            console.log(this.recruitmentCosts,'yahallo')
            const recruitmentCosts = this.selectedUnits.map(unit=> this.findRecruitmentCost(unit.Tier,this.recruitmentCost));
           return recruitmentCosts.reduce((sum,nextUnitCost) => sum + nextUnitCost,0 )
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