import { Base64 } from "js-base64";

// get params
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// check valid url
const isValidUrl = (text) => {
  try {
    new URL(text);
  } catch (e) {
    return false;
  }
  return true;
};

// if a link
if (params.a) {
  if (isValidUrl(params.a)) {
    const encoded = Base64.encodeURL(params.a);
    const url = window.location.origin + "/?b=" + encoded;
    const link = document.getElementById("link");
    link.innerHTML = url;
    link.setAttribute("href", url);
  }
}
// if a base64url
else if (params.b) {
  const decoded = Base64.decode(params.b);
  if (isValidUrl(decoded)) {
    window.location.href = decoded;
  }
}
