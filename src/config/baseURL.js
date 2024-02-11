const baseURL = import.meta.env.VITE_API;

const server =
  baseURL !== "DEV"
    ? "https://hydration-5xayjtz4za-ew.a.run.app"
    : "http://localhost:3000";
export default server;
