import dotnetBotLite from "@/assets/models/dotnet-bot-lite.glb?url";
import dotnetBot from "@/assets/models/dotnet-bot.glb?url";
import dukeLite from "@/assets/models/duke-lite.glb?url";
import duke from "@/assets/models/duke.glb?url";
import ferrisLite from "@/assets/models/ferris-lite.glb?url";
import ferris from "@/assets/models/ferris.glb?url";
import gopherLite from "@/assets/models/gopher-lite.glb?url";
import gopher from "@/assets/models/gopher.glb?url";
import pythonLite from "@/assets/models/python-lite.glb?url";
import python from "@/assets/models/python.glb?url";
import reactLite from "@/assets/models/react-lite.glb?url";
import react from "@/assets/models/react.glb?url";
import springLite from "@/assets/models/spring-lite.glb?url";
import spring from "@/assets/models/spring.glb?url";
import { isLiteRender } from "@/scene/canvas/render-quality.util";

const lite = isLiteRender();

export const MODEL_URL = {
  gopher: lite ? gopherLite : gopher,
  duke: lite ? dukeLite : duke,
  dotnetBot: lite ? dotnetBotLite : dotnetBot,
  ferris: lite ? ferrisLite : ferris,
  react: lite ? reactLite : react,
  spring: lite ? springLite : spring,
  python: lite ? pythonLite : python,
} as const;

export const MODEL_URLS: readonly string[] = Object.values(MODEL_URL);
