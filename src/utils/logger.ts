import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: "time,hostname,pid",
});

const log = pino(
  {
    name: "Logger",
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
  },
  stream
);

export default log;