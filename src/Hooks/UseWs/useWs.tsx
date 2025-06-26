import useWebSocket from "react-use-websocket";

const WS_URL = "ws://localhost:5005";

let wsConnection: ReturnType<typeof useWebSocket> | null = null;

export const useWs = () => {
  wsConnection = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    onOpen: () => console.log("WebSocket connected"),
    onClose: () => console.log("WebSocket closed"),
    onError: (e) => console.error("WebSocket error", e),
  });

  return wsConnection;
};
