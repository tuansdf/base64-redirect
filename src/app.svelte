<script>
  import { onMount } from "svelte";
  import { decodeToLink, encodeLink } from "./utils";

  let index = false;
  let text = "";
  let linkInput = "";

  let isCopied = false;
  let isError = false;

  let inputTimeout = null;
  let copyTimeout = null;

  $: {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
      const encoded = encodeLink(linkInput);
      if (encoded) text = window.location.origin + "/" + encoded;
    }, 200);
  }

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    isCopied = true;
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => (isCopied = false), 500);
  };

  onMount(() => {
    const link = window.location.search.slice(1);
    const base64 = window.location.pathname.slice(1);

    if (!base64 && !link) {
      index = true;
      return;
    }

    const decoded = decodeToLink(base64);
    if (decoded) {
      window.location.href = decoded;
      return;
    }

    const encoded = encodeLink(link);
    if (encoded) {
      text = window.location.origin + "/" + encoded;
      return;
    }

    isError = true;
  });
</script>

<main>
  {#if index}
    <h2>Bookmarklet</h2>
    <p>
      If you want to easily create a URL redirect, drag<br />
      <a
        href={`javascript:(function()%7Bconst%20a=%22${window.origin}/?%22+window.location;window.open(a,%22_blank%22)%7D)();`}
        >this</a
      ><br />
      to the bookmark toolbar
    </p>

    <h2>Create</h2>
    <input
      type="text"
      bind:value={linkInput}
      placeholder="https://example.com"
    />
  {/if}

  {#if isError}
    <p>Something is wrong...</p>
  {:else if text}
    <a href={text}>{text}</a><br />
    <button on:click={onCopy}>Copy to clipboard</button>
    {#if isCopied}
      <span>Copied</span>
    {/if}
  {/if}
</main>
