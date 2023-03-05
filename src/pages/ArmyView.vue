<template>
    <h1> this is the army viewer for {{ armyName }}</h1>
</template>
<script>
export default {
    inject:['stateList'],
    computed:{
        armyName(){

            for(const state in this.stateList){
                if(this.stateList[state] === this.$route.params.armyId){
                    return state
                }
            }
            return null
        }
    }
}
</script>