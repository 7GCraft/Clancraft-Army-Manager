<template>
    <h3> this is the army list</h3>
    <ul>
        <li v-for="(stateId,stateName) in CCStateList" :key="stateId">
            <router-link :to="this.$route.path+'/'+stateId">{{ stateName }}</router-link>
        </li>
    </ul>
</template>
<script>


export default {
    inject:['stateList'],
    computed:{
        CCStateList(){
            return this.stateList
        },
    }
}
 
</script>