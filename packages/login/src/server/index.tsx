import express, { Request, Response } from "express";
import template from "./lib/template";
import path from "path";
import compression from "compression";
import ws from "./lib/websocket";
import fs from "fs";
import logger from "morgan";
import winston, { stream } from "./lib/logger";
import { getAssets } from "./lib/helpers";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "../client/App";

let port: number = 5011;

const renderApp = () => {
  return renderToString(<App />);
};

const app = express();
app.use(compression());
app.use("/login", express.static(path.resolve(path.join(__dirname, "client"))));

app.use(logger("dev", { stream: stream }));

if (IS_DEVELOPMENT) {
  app.get("/login", async (req: Request, res: Response) => {
    let assets: assetsType;

    try {
      assets = await getAssets();
    } catch (e) {
      let message: string | unknown = e;
      if (e instanceof Error) {
        message = e.message;
      }
      winston.error(message);
    }

    const appComponent = renderApp();

    const htmlString = template(
      {},
      appComponent,
      "styleTags",
      {},
      "userLng",
      assets
    );

    res.send(htmlString);
  });

  const server = app.listen(port, () => {
    winston.info(`Server is listening on port ${port}`);
  });

  const wss = ws(server);

  const manifestFile = path.resolve(
    path.join(__dirname, "client/manifest.json")
  );

  let fsWait = false;
  let waitTimeout: ReturnType<typeof setTimeout>;
  fs.watch(manifestFile, (event, filename) => {
    if (filename && event === "change") {
      if (fsWait) return;
      fsWait = true;
      waitTimeout = setTimeout(() => {
        fsWait = false;
        clearTimeout(waitTimeout);

        wss.broadcast && wss.broadcast("reload");
      }, 100);
    }
  });
}
