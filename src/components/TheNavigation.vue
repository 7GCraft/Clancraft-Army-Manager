<template>
    <header>
        <nav>
            <h1><router-link to="/">Clancraft Army Manager</router-link></h1>
        </nav>
        <nav>
            <ul>
              <li>
                    <router-link to="/">Army List</router-link>
                </li>
                <li>
                    <router-link to="/units">Units</router-link>
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

header nav {
  width: 30%;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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