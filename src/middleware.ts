import { eventHandler, handleCors } from "vinxi/http";
// import { env } from "./env";

export default eventHandler((event) => {
  // const isDev = process.env.NODE_ENV === "development";

  handleCors(event, {
    origin: [
      "https://sheye-portfolio.vercel.app",
      "https://oluwaseye.dev",
      // ...(isDev ? ["http://localhost:5173"] : []),
    ],
    credentials: true,
  });
});
