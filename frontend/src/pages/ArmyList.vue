<template>
  <div class="flex w-full">
    <div
      class="my-2 mx-2 shadow-2xl inline-block w-40 h-fit border border-black"
    >
      <h1
        class="text-5xl border border-black px-2 bg-black text-white w-100 h-[110px] cursor-pointer"
      >
        Army List
      </h1>
      <ul>
        <li
          class="hover:bg-green-700 active:bg-green-600 hover:text-white focus:bg-green-500 text-medium font-medium mx-2 my-1 px-2.5 py-0.5 rounded"
          v-for="state in CCStateList"
          :key="state"
        >
          <router-link
            class="inline-block w-full"
            :to="'/armies/' + stateList[state]"
            >{{ state }}</router-link
          >
        </li>
      </ul>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  inject: ['clancraftUnits', 'stateList'],
  computed: {
    CCStateList() {
      const stateList = [
        ...new Set(this.clancraftUnits.map(unit => unit['CC Faction'])),
      ];
      return stateList.filter(state => state).sort();
    },
  },
};
</script>
