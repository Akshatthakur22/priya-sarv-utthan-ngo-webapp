/** Safe JSON-LD serialization — prevents </script> breakout in inline scripts */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
