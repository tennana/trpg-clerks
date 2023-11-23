<svelte:options immutable />

<script lang="ts">
  import type { JsonMessage } from '../../type/index.type';

  export let messages: JsonMessage[] = [];
</script>

{#each messages as message}
  <div class="message">
    <div class="icon"><img src={message.iconUrl} alt="" /></div>
    <div>
      <h4 class="name">{message.name}</h4>
      <span class="body">{message.body}</span>
    </div>
  </div>
{/each}
