<svelte:options immutable />

<script lang="ts">
  import type { JsonMessage } from '../../type/index.type';

  export let messages: JsonMessage[] = [];
</script>

{#each messages as message}
  <div class="message">
    {#if message.iconUrl}
      <div class="icon"><img src={message.iconUrl} alt="" /></div>
      {:else}
      <div class="icon"></div>
    {/if}
    <div style={message.color ? `color: ${message.color}` : ''}>
      <h4 class="name">{message.name}</h4>
      <span class="body">{@html message.htmlBody}</span>
    </div>
  </div>
{/each}
