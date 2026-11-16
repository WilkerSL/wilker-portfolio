import dotnetBot from "@/assets/models/dotnet-bot.glb?url";
import duke from "@/assets/models/duke.glb?url";
import ferris from "@/assets/models/ferris.glb?url";
import gopher from "@/assets/models/gopher.glb?url";
import python from "@/assets/models/python.glb?url";
import react from "@/assets/models/react.glb?url";
import spring from "@/assets/models/spring.glb?url";

export const MODEL_URL = {
  gopher,
  duke,
  dotnetBot,
  ferris,
  react,
  spring,
  python,
} as const;

export const MODEL_URLS: readonly string[] = Object.values(MODEL_URL);
