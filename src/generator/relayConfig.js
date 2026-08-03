// Single source of truth for the local dev relay's address (server/index.js).
// Previously each consumer hardcoded "http://localhost:9001" / "ws://localhost:9001"
// independently, so a port/protocol change meant hunting down every copy.
export const RELAY_HTTP = "http://localhost:9001";
export const RELAY_WS = "ws://localhost:9001";

const RELAY_TOKEN = import.meta.env.VITE_RELAY_TOKEN;
export const RELAY_AUTH_HEADERS = RELAY_TOKEN ? { "X-Relay-Token": RELAY_TOKEN } : {};
