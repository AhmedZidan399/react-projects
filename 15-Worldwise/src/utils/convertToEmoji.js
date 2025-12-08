// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

export function convertToEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "❓";

  const code = countryCode.toUpperCase();

  // Must be A–Z letters only
  if (!/^[A-Z]{2}$/.test(code)) return "❓";

  const codePoints = [...code].map((char) => char.codePointAt(0) + 127397);

  return String.fromCodePoint(...codePoints);
}
