<template>
    <div class="flex">
   <div class="my-2 mx-2 shadow-2xl inline-block w-40 h-fit  border border-black">
        <h1 class=" text-white bg-black  text-center font-bold  py-3 text-2xl border border-black border-xl mb-2">
            Unit Filter
        </h1>
        <form class="border-black">
            <label for="name-filter">
                Name Filter: 
            </label>
            <input />
        </form>
        
    </div>
    <div class="h-fit pb-2 px-2 ml-0 mr-0 my-2 shadow-2xl inline-block border border-black grow">
    <unit-table></unit-table>
    </div>
</div>

</template>


<script>
import UnitTable from '@/components/UnitTable.vue'

export default {
    components:{
        UnitTable
    }
}
</script>