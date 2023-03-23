<template>
    <h3> this is the army list</h3>
    <ul>
        <li v-for="state in CCStateList" :key="state">
            <router-link :to="this.$route.path+'/'+stateList[state]">{{ state }}</router-link>
        </li>
    </ul>
</template>
<script>


export default {
    inject:['clancraftUnits','stateList'],
    computed:{
        CCStateList(){
            const stateList =  [...new Set(this.clancraftUnits.map(unit => unit["CC Faction"]))];
            return stateList.filter(state => state).sort()
        },
    }
}
 
</script>