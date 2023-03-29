<template>
 <div class="h-fit pb-2 px-2 ml-0 mr-0 my-2 shadow-2xl inline-block border border-black grow">
    <h1 class="text-center text-xl border border-black border-xl mb-2"> {{ armyName }}</h1>
    <army-table  @deleteRow="removeUnit" @updateRow="updateUnit" :armyList="armyList"></army-table>
    <add-unit-form @submit="updateArmy" :units="sortedAvailableUnits" ></add-unit-form>

    <unit-generator-form v-if="showUnitGenerator" @add-units="updateArmy" :units="sortedAvailableUnits"> </unit-generator-form>
    <button @click="showUnitGenerator = !showUnitGenerator" class="hover:bg-sky-500 h-12 border px-2 text-white border-black bg-sky-600 mt-2">{{showUnitGenerator ? 'Close' : 'Open' }} Unit Generator</button>
    <button @click="showSpecialAddUnit = !showSpecialAddUnit" class=" mx-2 hover:bg-yellow-500 h-12 border px-2 text-white border-black bg-yellow-600 mt-2">{{showSpecialAddUnit ? 'Close' : 'Open'}} Special Unit Adder </button>
 </div>
</template>
<script>
import ArmyTable from '@/components/ArmyTable.vue';
import AddUnitForm from '@/components/AddUnitForm.vue';
import UnitGeneratorForm from '@/components/UnitGeneratorForm.vue';
export default {
    inject:['stateList','clancraftUnits','calculateUnitSize','findUpkeep','unitUpkeep'],
    components:{ArmyTable, AddUnitForm, UnitGeneratorForm},
    created(){
        if(!Object.values(this.stateList).includes(this.$route.params.armyId)){
            this.$router.push('/')
        }
       
        this.fetchArmyList()
        console.log(this.armyList,'yotsuba')
    },
    data(){
        return{
            armyList: [],
            showUnitGenerator: false
        }
    },
    watch: {
        armyName(){
            this.fetchArmyList()
            this.showUnitGenerator = false
        }
    },
    methods:{
        addBasicDetails(newUnits){
            const newArmy = []
            let newNumber = this.armyList.length + 1;
            for (let newUnit of newUnits) {
                console.log(newUnit,'nueva',this.calculateUnitSize,this.findUpkeep)
                newUnit = {
                    ...newUnit,
                    Number: newNumber,
                    Size: this.calculateUnitSize(newUnit.Tier),
                    upkeepModifier: 0,
                    localStatus: "F",
                    BaseUpkeep: this.findUpkeep(newUnit.Tier, this.unitUpkeep),
                }
                newNumber++;
                newArmy.push(newUnit)
            }
            return newArmy

        },
        updateArmy(newUnits){
            console.log('new Units are',newUnits)

            const newArmy = this.addBasicDetails(newUnits)
            const newArmyList = [...this.armyList,...newArmy]
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
                    return state
                }
            }
            return null
        },
        sortedAvailableUnits(){
            const availableUnits = this.clancraftUnits.filter(unit=> unit['CC Faction'] == this.armyName);
            console.log(availableUnits)
            return availableUnits.sort((a, b) => a['CC Units'].localeCompare(b['CC Units']));
        },     
    }
}
</script>