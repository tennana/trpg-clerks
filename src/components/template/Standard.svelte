<svelte:options immutable />

<script lang="ts">
  import type { JsonMessage } from '../../type/index.type';

  export let messages: JsonMessage[] = [];
</script>

{#each messages as message}
  <div class="message">
    {#if message.iconUrl}
      <div class="icon"><img src={message.iconUrl} alt="" /></div>
    {/if}
    <div>
      <h4 class="name" style={message.color ? `color: ${message.color}` : ''}>{message.name}</h4>
      <span class="body">{@html message.htmlBody}</span>
    </div>
  </div>
{/each}
