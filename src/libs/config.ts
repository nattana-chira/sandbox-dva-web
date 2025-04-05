export const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? (() => { throw new Error("Missing API_URL") })(),
  WEB_SOCKET_URL: process.env.NEXT_PUBLIC_WEB_SOCKET_URL ?? (() => { throw new Error("Missing WEB_SOCKET_URL") })(),
};