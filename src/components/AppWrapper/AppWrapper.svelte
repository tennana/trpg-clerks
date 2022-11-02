<div role="main" class="root">
  <slot />
</div>

<style>
  .root {
    height: fit-content;
    width: fit-content;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 1em;
  }
</style>
