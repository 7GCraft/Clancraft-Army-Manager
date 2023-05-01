<template>
  <div class="flex w-full">
    
    <div
      class=" pb-2 my-2 mx-2 shadow-2xl inline-block w-40 h-fit border border-black"
    >
      <h1
        class="text-5xl border border-black px-2 bg-black text-white w-100 h-[110px] cursor-pointer"
      >
        Army List
      </h1>
      <ul>
        <li
          class="hover:bg-green-700 active:bg-green-600 hover:text-white focus:bg-green-500 text-medium font-medium mx-2 my-1 px-2.5 py-0.5 rounded"
          v-for="(id,name) in CCStateList"
          :key="id"
        >
          <router-link
            class="inline-block w-full"
            :to="'/armies/' + id"
            >{{ name }}</router-link
          >
        </li>
      </ul>
      <div class="text-center p-2">
        <button class="btn-add-state rounded-xl" @click="toggleModal">
          <font-awesome-icon
                  icon="fa-solid fa-plus"
                  class="text-white text-5xl "
                ></font-awesome-icon>
        </button>
      </div>
    </div>
    <add-state-modal @submitModal="addNewState" @closeModal="toggleModal" :show="showAddStateModal"></add-state-modal>

    <router-view></router-view>
  </div>
</template>
<script>
import AddStateModal from '@/components/AddStateModal.vue';
import axios from 'axios';
export default {
  inject: ['clancraftUnits', 'stateList','currency','stateMap','sortObjectKeys'],
  components:{
    AddStateModal
  },
  mounted(){
      console.log(this.stateList.value,'sakarada')
    },
  computed: {
    CCStateList() {
     
      return this.stateList.value
    },
    
  },
  data(){
    return{
      showAddStateModal: false,
      
    }
  },
  methods:{
    toggleModal(){
      this.showAddStateModal = !this.showAddStateModal
    },
    async addNewState(stateData){
      console.log
      this.showAddStateModal = false;
     const newCurrency = {
       ...this.currency.value,
       [stateData.name] : stateData.currency
     }
     console.log(this.currency.value)

     console.log(this.currency.value,'money')
     const newStateList = {
       ...this.stateList.value,
       [stateData.name] : stateData.id
     }

     const newStateMap = {
       ...this.stateMap.value,
       [stateData.name]: stateData.map
     }

     console.log(this.sortObjectKeys(newStateList),'kalasar')


      try{
        await axios.post('http://localhost:3000/api/add-new-state',{
          armyMap: this.sortObjectKeys(newStateMap),
          armyData: this.sortObjectKeys(newStateList),
          currency: this.sortObjectKeys(newCurrency)
        })
      }catch(error){
        throw new Error(error)
      }
    }
  }
};
</script>
