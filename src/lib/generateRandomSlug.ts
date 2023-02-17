export default function generateRandomSlug(len = 6) {
  let slug = "", i = 0;
  const haystack = "qwertyuiopasdfghjklzxcvbnm1234567890";
  while (i < haystack.length) {
    slug += haystack.charAt(Math.floor(Math.random() * haystack.length));
    i++;
  }
  return slug.substring(0, len);
}
