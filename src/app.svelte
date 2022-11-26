<script>
  import { Base64 } from "js-base64";
  import { onMount } from "svelte";

  let text = "";
  let error = "";

  const ERROR = "Not a link";

  // check a url is valid
  const isValidUrl = (text) => {
    try {
      new URL(text);
    } catch (e) {
      return false;
    }
    return true;
  };

  onMount(() => {
    const params = new URLSearchParams(window.location.search);

    // get url or base64
    const slug =
      window.location.pathname.slice(1) || window.location.search.slice(1);
    const redirect = params.get("redirect") !== "0";

    // if it is a url, encode
    if (isValidUrl(slug)) {
      const encoded = Base64.encode(slug, true);
      text = window.location.origin + "/" + encoded;
      return;
    }
    // if it is a base64, decode
    else if (Base64.isValid(slug)) {
      const decoded = encodeURI(Base64.decode(slug));
      if (isValidUrl(decoded)) {
        if (redirect) {
          window.location.href = decoded;
        } else {
          text = decoded;
        }
        return;
      }
    }
    error = ERROR;
  });
</script>

{#if error}
  <p>{error}</p>
{:else if text}
  <a href={text}>{text}</a>
{/if}
