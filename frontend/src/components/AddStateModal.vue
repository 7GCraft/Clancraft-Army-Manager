<template>
  <div class="fixed inset-0 z-10 overflow-y-auto" v-if="show">
    <div
      class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
      >&#8203;

      <div
        class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-400 rounded-full sm:mx-0 sm:h-10 sm:w-10"
            >
              <font-awesome-icon
                icon="fa-solid fa-plus"
                class="text-3xl text-white hover:animate-pulse"
              ></font-awesome-icon>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg font-medium leading-6 text-gray-900"
                id="modal-headline"
              >
                Add State Modal
              </h3>
              <div class="mt-2">
                <form
                  @submit="$emit('submitModal', stateData)"
                  id="add-state-form"
                >
                  <div class="mt-1 form-control">
                    <label for="state-name" class="mr-[52px]">State Name</label>
                    <input
                      v-model="stateData.name"
                      type="text"
                      class="p-1 border border-black"
                    />
                  </div>
                  <div class="mt-1 form-control">
                    <label for="state-name" class="mr-20">State ID</label>
                    <input
                      v-model="stateData.id"
                      type="text"
                      class="p-1 border border-black"
                    />
                  </div>
                  <div class="mt-1 form-control">
                    <label for="state-name" class="mr-8">State Currency</label>
                    <input
                      v-model="stateData.currency"
                      type="text"
                      class="p-1 border border-black"
                    />
                  </div>
                  <div class="mt-1 form-control">
                    <label for="state-name" class="mr-[64px]">State Map</label>
                    <select
                      v-model="stateData.map"
                      class="w-48 p-1 border border-black"
                    >
                      <option
                        :key="key"
                        v-for="(value, key) in filteredStateMap"
                        :value="value"
                      >
                        {{ value }}
                      </option>
                    </select>
                   
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          class="justify-end px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row"
        >
          <button
            type="submit"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue sm:ml-3 sm:w-auto sm:text-sm"
            form="add-state-form"
          >
            Submit
          </button>
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray sm:ml-3 sm:w-auto sm:text-sm"
            @click="$emit('closeModal')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['show'],
  emits: ['closeModal', 'submitModal'],
  inject: ['stateMap', 'currency'],
  computed: {
    filteredStateMap() {
      let stateMapOptions = [];
      let stateMap = this.$store.getters.getStateMap;
      console.log('statu-mappu', stateMap);
      for (let key in stateMap) {
        stateMapOptions.push(stateMap[key]);
      }
      return Array.from(new Set(stateMapOptions));
    },
  },
  data() {
    return {
      stateData: {
        name: '',
        id: '',
        currency: '',
        map: '',
      },
    };
  },
  methods: {
   
  }
};
</script>
