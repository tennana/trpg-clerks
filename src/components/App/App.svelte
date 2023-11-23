<script lang="ts">
  import loggerStore from '../../lib/logger.js';
  // eslint-disable-next-line import/no-unresolved
  import fetchLog from '@/caller';
  import AppWrapper from '../AppWrapper/AppWrapper.svelte';
</script>

<AppWrapper>
  <div class="root__wrapper">
    <ol>
      <li>ココフォリアのルームを開き、取得したいタブを選びます</li>
      <li>取得開始したい発言まで、スクロールバーで発言を遡って取得ボタンを押下します。</li>
    </ol>
    <button on:click={fetchLog}>取得</button>
    <hr />
    <textarea>{$loggerStore}</textarea>
  </div>
</AppWrapper>

<style>
  .root__wrapper {
    width: 100%;
  }
  button {
    width: 5em;
    margin: 0 50%;
  }
  textarea {
    display: block;
    width: 100%;
    height: 10em;
  }
</style>
