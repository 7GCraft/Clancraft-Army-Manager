<template>
    <div class="w-96 h-fit">
   <h3 class="px-2 text-lg text-white bg-black">Add unit form</h3>
    <form @submit.prevent="submitForm" class="border border-black px-1">
        <div class="form-control mt-1">
            <label for="unit-selection" class="mr-2">Select a unit:</label>
            <select name="unit-selection" v-model.trim="selectedUnit.ID" class="border-black border">
            <option v-for="unit in units" v-bind:key="unit.ID" :value="unit.ID">{{ unit['CC Units'] }}</option>
            </select>
        </div>
        <div class="form control mt-1">
            <label for="unit-name" class="mr-2">Unit Name</label>
            <input type="text" class="border border-black" v-model.trim="selectedUnit.name" id="unit-name"/>
        </div>
        <div class="form-control">
            <label for="unit-structure">Structure</label>
            <input type="text" v-model.trim="selectedUnit.structure" id="unit-structure">
        </div>
        <div class="form-control">
            <label for="unit-sub-structure">Sub-Structure</label>
            <input type="text" v-model.trim="selectedUnit.subStructure" id="unit-sub-structure">
        </div>
       
         <h4>Recruitment cost: {{totalRecruitmentCost}}</h4>
        <button type="button" @click="addUnits">click to add unit</button>
        <button>Click to submit</button>
    </form>
     <div>
            <ul>
                <li v-for="unit in selectedUnits" :key="unit['Name']">
                    {{ unit['Name'] }} - {{ unit['Atilla Units'] }} - {{ unit['SubStructure'] }} - {{ unit['Structure'] }}
                </li>
            </ul>
        </div>
      </div>
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