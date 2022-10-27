<script lang="ts">
  import AppWrapper from '../AppWrapper/AppWrapper.svelte';
  // eslint-disable-next-line import/no-unresolved
  import fetchLog from '@/caller';
</script>

<AppWrapper>
  <div class="root__wrapper">
    <button on:click={fetchLog}>取得するよ</button>
  </div>
</AppWrapper>

<style>
  .root__wrapper {
    width: 100%;
    text-align: center;
  }
</style>
