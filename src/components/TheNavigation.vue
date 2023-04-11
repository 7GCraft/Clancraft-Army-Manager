<template>
    <header class="flex justify-center">
        <nav class="mr-20">
            <h1 class="text-xl font-bold border border-white active:border-4 active:bg-green-600"><router-link to="/">Clancraft Army Manager</router-link></h1>
        </nav>
        <nav class="">
            <ul>
              <li>
                    <router-link class="text-xl active:bg-green-600 active:border-white border border-white" to="/">Army List</router-link>
                </li>
                <li>
                    <router-link class="text-xl active:bg-green-600 active:border-white border border-white" to="/units">Units</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
 header {
  width: 100%;
  height: 5rem;
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  color: white;
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid white;
}

h1 {
  margin: 0;
  color:white;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}



header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>