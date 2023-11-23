<svelte:options immutable />

<script lang="ts">
  import type { JsonMessage } from '../../type/index.type';

  export let messages: JsonMessage[] = [];
</script>

{#each messages as message}
  <div class="message">
    <div class="icon"><img src={message.iconUrl} alt="" /></div>
    <div class="p">
      <b>{message.name}</b><br />
      <span>{message.body}</span>
    </div>
  </div>
{/each}
