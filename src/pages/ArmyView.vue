<template>
    <h1> this is the army viewer for {{ armyName }}</h1>
    <army-table @deleteRow="removeUnit" @updateRow="updateUnit" :armyList="armyList"></army-table>
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
        console.log(this.armyList,'yotsuba')
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
            console.log('dreams of a republic')
            localStorage.setItem(`armies/${this.armyName}`,JSON.stringify(newArmyList))
            this.fetchArmyList()
        },
        fetchArmyList(){
            const newArmyList = localStorage.getItem(`armies/${this.armyName}`) 
            this.armyList = newArmyList ? JSON.parse(newArmyList) : []
        },
        removeUnit(unitIdx){
            const targetedUnitIdx = this.armyList.findIndex(unit=> unit.Number == unitIdx)
            const newArmyList = [...this.armyList]
            newArmyList.splice(targetedUnitIdx,1);
            let counter = 1;
            for(let unit of newArmyList){
                unit.Number = counter;
                counter++
            }

            localStorage.setItem(`armies/${this.armyName}`,JSON.stringify(newArmyList))
            this.fetchArmyList();
        },
        updateUnit(newUnit){
             console.log('428',newUnit.Number);
            const newArmyList = [...this.armyList]
            const targetUnitIdx = newArmyList.findIndex(unit=> unit.Number == newUnit.Number)
            console.log(targetUnitIdx)
            newArmyList.splice(targetUnitIdx,1,newUnit)
            console.log(newArmyList)
            localStorage.setItem(`armies/${this.armyName}`,JSON.stringify(newArmyList))
            this.fetchArmyList()
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
    }
}
</script>