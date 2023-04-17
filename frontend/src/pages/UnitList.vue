<template>
  <div class="flex">
    <div
      class="my-2 mx-2 shadow-2xl inline-block w-56 h-fit border border-black"
    >
      <h1
        class="text-white bg-black text-center font-bold py-3 text-2xl border border-black border-xl mb-2"
      >
        Unit Filter
      </h1>
      <form class="px-2">
        <div class="form-control mb-2">
          <label for="name-filter"> Unit Name Filter </label>
          <input
            class="border border-black"
            name="name-filter"
            v-model="nameFilter"
          />
        </div>
        <div class="form-control mb-2">
          <label for="clancraft-filter"> CC Faction Filter </label>
          <input
            class="border border-black"
            name="clancraft-filter"
            v-model="clancraftFilter"
          />
        </div>
        <div class="form-control mb-2">
          <label for="name-filter"> Atilla Faction Filter </label>
          <input
            class="border border-black"
            name="attila-filter"
            v-model="attilaFilter"
          />
        </div>
        <div class="form-control mb-2">
          <label for="type-filter"> Unit Type Filter : </label>
          <input
            class="border border-black text-uppercase"
            name="type-filter"
            v-model="typeFilter"
          />
        </div>
      </form>
    </div>
    <div
      class="h-fit pb-2 px-2 ml-0 mr-0 my-2 shadow-2xl inline-block border border-black grow"
    >
      <unit-table :units="availableUnits"></unit-table>
    </div>
  </div>
</template>

<script>
import UnitTable from '@/components/UnitTable.vue';

export default {
  inject: ['clancraftUnits'],
  components: {
    UnitTable,
  },
  data() {
    return {
      nameFilter: '',
      clancraftFilter: '',
      attilaFilter: '',
      typeFilter: '',
    };
  },
  computed: {
    availableUnits() {
      return this.clancraftUnits.filter(unit => {
        return (
          (unit['CC Units']
            .toUpperCase()
            .includes(this.nameFilter.toUpperCase()) ||
            unit['Atilla Units']
              .toUpperCase()
              .includes(this.nameFilter.toUpperCase())) &&
          unit['CC Faction']
            .toUpperCase()
            .includes(this.clancraftFilter.toUpperCase()) &&
          unit['Atilla Faction']
            .toUpperCase()
            .includes(this.attilaFilter.toUpperCase()) &&
          unit['Tier'].toUpperCase().includes(this.typeFilter.toUpperCase())
        );
      });
    },
  },
};
</script>
