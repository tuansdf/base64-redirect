import { Base64 } from "js-base64";

export const isValidUrl = (text) => {
  try {
    new URL(text);
  } catch (e) {
    return false;
  }
  return true;
};

export const encodeLink = (link) => {
  if (isValidUrl(link)) {
    return Base64.encode(link, true);
  }
};

export const decodeToLink = (base64) => {
  if (Base64.isValid(base64)) {
    const decoded = encodeURI(Base64.decode(base64));
    if (isValidUrl(decoded)) return decoded;
  }
};
