<template>
  <div>
    <h1>Vue ProseMirror rendering</h1>
    <ul>
      <li><router-link to="/">Index</router-link></li>
      <li><router-link to="/table">table</router-link></li>
      <li><router-link to="/img">img</router-link></li>
      <li><router-link to="/etc">etc</router-link></li>
      <li><router-link to="/link">link</router-link></li>
      <li><router-link to="/router-link">RouterLink</router-link></li>
      <li><router-link to="/custom-component">Custom Component</router-link></li>
      <li><router-link to="/text-style">textStyle</router-link></li>
      <li><router-link to="/tailwind">tailwind</router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<style scoped lang="postcss">
ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 3em;

  > li {
    margin-right: 1em;
  }
}
</style>
