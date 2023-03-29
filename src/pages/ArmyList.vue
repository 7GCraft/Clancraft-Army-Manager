<template>
    <base-card>
    <h1 class="text-5xl border border-black bg-black text-white w-100 h-[110px] cursor-pointer"> Army List</h1>
    <ul>
        <li class="hover:bg-green-700 hover:text-white focus:bg-green-500  text-medium font-medium mx-2 my-1  px-2.5 py-0.5 rounded" v-for="state in CCStateList" :key="state">
            <router-link :to="this.$route.path+'/'+stateList[state]">{{ state }}</router-link>
        </li>
    </ul>
    </base-card>
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