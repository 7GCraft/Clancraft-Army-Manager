<template>
    <h1> this is the army viewer for {{ armyName }}</h1>
    <army-table :armyList="armyList"></army-table>
    <h2>Total upkeep: {{ totalUpkeep }}</h2>
    <add-unit-form @submit="updateArmy" :armyName="armyName"></add-unit-form>
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
        console.log(this.armyList)
        this.fetchArmyList()
    },
    data(){
        return{
            armyList: []
        }
    },
    methods:{
        updateArmy(newUnits){
            console.log('new Units are',newUnits)
            const newArmyList = [...this.armyList]
            let newNumber = this.armyList.length + 1;
            for(let newUnit of newUnits){
                newUnit.Number = newNumber;
                newNumber++;
                newArmyList.push(newUnit)
            }
            localStorage.setItem(`armies/${this.armyName}`,JSON.stringify(newArmyList))
            this.fetchArmyList()
        },
        fetchArmyList(){
            const newArmyList = localStorage.getItem(`armies/${this.armyName}`) 
            this.armyList = newArmyList ? JSON.parse(newArmyList) : []
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
        totalUpkeep(){
            return this.armyList.reduce((sum,unit)=> sum+ unit.BaseUpkeep,0)
        }
       
    }
}
</script>