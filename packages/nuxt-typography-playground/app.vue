<template>
  <nav>
    <h1>Nuxt ProseMirror typography playground</h1>
    <ul>
      <li><nuxt-link to="/">index</nuxt-link></li>
      <li><nuxt-link to="/book">book (~6000 nodes)</nuxt-link></li>
    </ul>
  </nav>
  <main>
    <nuxt-page />
  </main>
</template>

<style scoped>
nav {
  background: #bfd5c7;
  color: #2b332e;
  padding: 2em;

  h1 {
    font-size: 2em;
  }

  ul {
    display: flex;
    li {
      margin-right: 1em;
      a {
        text-decoration: underline;
      }
    }
  }
}
main {
  margin: 0 auto;
  max-width: 80ch;
  padding: 2em;
}
</style>
