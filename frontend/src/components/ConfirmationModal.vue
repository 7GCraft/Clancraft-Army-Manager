<template>
     <div class="fixed z-10 inset-0 overflow-y-auto" v-if="show">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-400 sm:mx-0 sm:h-10 sm:w-10">
                    <font-awesome-icon
                  icon="fa-solid fa-plus"
                  class="text-white text-3xl hover:animate-pulse"
                ></font-awesome-icon>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      class="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Are you sure you wish to replenish all units?
                    </h3>
                    <div class="mt-2">
                   
                    </div>
                  </div>
                </div>
              </div>
              <form id="replenishment-form" @submit.prevent="$emit('submit-modal')">
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-center">
                <button
                  type="submit"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green sm:ml-3 sm:w-auto sm:text-sm"
                  form="replenishment-form"
                  
                >
                 Confirm Replenishment 
                </button>
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red sm:ml-3 sm:w-auto sm:text-sm"
                  @click="$emit('closeModal')"
                >
                  Cancel
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
</template>

<script>
    export default{
        props:['show'],
        emits:['closeModal','submitModal'],
        inject:[
            'stateMap','currency'
        ],
        computed:{
            filteredStateMap(){
            let stateMapOptions = [];
             for(let key in this.stateMap.value){
                stateMapOptions.push(this.stateMap.value[key])
             }
             return Array.from(new Set(stateMapOptions));
            }
        },
        data(){
            return{
                stateData:{
                    name:'',
                    id:'',
                    currency:'',
                    map:''
                }
            }
        }
    }
</script>