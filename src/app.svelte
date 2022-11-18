<script>
  import { Base64 } from "js-base64";
  import { onMount } from "svelte";

  let text = "";

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
    // get whatever url or base64
    const slug = window.location.pathname.slice(1);

    // if it is a url, encode
    if (isValidUrl(slug)) {
      const encoded = Base64.encode(slug, true);
      text = window.location.origin + "/" + encoded;
    }
    // if it is a base64, decode
    else if (Base64.isValid(slug)) {
      const decoded = Base64.decode(slug);
      if (isValidUrl(decoded)) {
        window.location.href = decoded;
      }
    }
  });
</script>

<pre>{text}</pre>
