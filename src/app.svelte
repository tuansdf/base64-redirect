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
    // a: slug, z: redirect
    const params = new URLSearchParams(window.location.search);

    // get url or base64
    const slug = params.get("a") || window.location.pathname.slice(1);
    const redirect = !params.get("z");

    // if it is a url, encode
    if (isValidUrl(slug)) {
      const encoded = Base64.encode(slug, true);
      text = window.location.origin + "/" + encoded;
    }
    // if it is a base64, decode
    else if (Base64.isValid(slug)) {
      const decoded = Base64.decode(slug);
      if (isValidUrl(decoded)) {
        if (redirect) {
          window.location.href = decoded;
        } else {
          text = decoded;
        }
      } else {
        error = ERROR;
      }
    } else {
      error = ERROR;
    }
  });
</script>

{#if error}
  <p>{error}</p>
{:else if text}
  <a href={text}>{text}</a>
{/if}
