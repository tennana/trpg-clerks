<script lang="ts">
  // eslint-disable-next-line import/no-unresolved
  import fetchLog from '@/caller';
  import {OUTPUT_TYPE} from '../../type/index.type';
  import AppWrapper from '../AppWrapper/AppWrapper.svelte';

  function callFetchLog() {
    fetchLog(OUTPUT_TYPE.JSON_ZIP);
  }
</script>

<AppWrapper>
  <div class="root__wrapper">
    <button on:click={callFetchLog}>取得するよ</button>
  </div>
</AppWrapper>

<style>
  .root__wrapper {
    width: 100%;
    text-align: center;
  }
</style>
