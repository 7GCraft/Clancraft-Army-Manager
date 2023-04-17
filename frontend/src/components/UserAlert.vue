<template>
  <Teleport to="body">
    <div
      v-show="show"
      class="fixed inset-0 bg-black opacity-40 z-10 backdrop-filter blur-xl"
    ></div>
  </Teleport>

  <transition name="fade-in">
    <div
      v-show="show"
      class="z-40 backdrop-blur-xl-50 transition-opacity ease-in-out duration-1000 top-0 mx-2 my-2 fixed left-0 bg-green-500 border-4 border-white text-white p-4"
      role="alert"
    >
      <p class="font-bold"><slot name="title" /></p>
      <p><slot name="body" /></p>
      <span
        class="absolute text-sm mr-0 right-0 top-0 cursor-pointer bg-white active:bg-red-500 grow border-sm border-black py-0"
        @click="this.$emit('hide')"
      >
        <font-awesome-icon
          icon="fa-solid fa-x"
          class="text-red-500 border"
        ></font-awesome-icon>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['show'],
  emits: ['hide'],
};
</script>
<style scoped>
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
.fade-in-enter-active {
  transition: opacity 0.3s ease-in;
}
.fade-in-enter-to,
.fade-in-leave-from {
  opacity: 100;
}
.fade-in-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>
