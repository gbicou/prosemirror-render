<template>
  <header>
    <h1>Nuxt ProseMirror playground</h1>
    <ul>
      <li>
        <nuxt-link to="/"> index </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/table"> table </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/book"> book (~6000 nodes) </nuxt-link>
      </li>
    </ul>
  </header>
  <main>
    <nuxt-page />
  </main>
</template>

<style scoped lang="postcss">
header {
  background: #bfd5c7;
  color: #2b332e;
  padding: 2em;

  & a {
    color: inherit;
    text-decoration: underline;
  }

  & h1 {
    margin: 0;
    font-size: 2em;
  }

  & ul {
    margin: 1em 0 0 0;
    padding: 0;
    list-style: none;
    display: flex;

    & li {
      margin: 0 1em 0 0;
    }
  }
}
main {
  margin: 0 auto;
  max-width: 80ch;
  padding: 2em;
}
</style>
