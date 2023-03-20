<template>
    <h1> this is the army viewer for {{ armyName }}</h1>
    <army-table :armyList="armyList"></army-table>
    <add-unit-form :armyName="armyName"></add-unit-form>
</template>
<script>
import ArmyTable from '@/components/ArmyTable.vue';
import AddUnitForm from '@/components/AddUnitForm.vue';
export default {
    inject:['stateList'],
    components:{ArmyTable, AddUnitForm},
    created(){
        if(!Object.values(this.stateList).includes(this.$route.params.armyId)){
            this.$router.push('/')
        }
     
    },
    computed:{
        armyName(){
            for(const state in this.stateList){
                if(this.stateList[state] === this.$route.params.armyId){
                    if(state === 'Frielant'){
                        return 'Trahian'
                    }
                    return state
                }
            }
            return null
        },
        armyList(){
            return localStorage.getItem(`armies/${this.armyName}`) || []
        }
    }
}
</script>