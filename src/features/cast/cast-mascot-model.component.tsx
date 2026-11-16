import { MascotId } from "@/core/enums/mascot-id.enum";
import { DotnetBotModel } from "@/scene/mascots/dotnet-bot/dotnet-bot.model";
import { DukeModel } from "@/scene/mascots/duke/duke.model";
import { FerrisModel } from "@/scene/mascots/ferris/ferris.model";
import { GopherModel } from "@/scene/mascots/gopher/gopher.model";
import type { CastMascotModelProps } from "@/features/cast/cast.interfaces";

export function CastMascotModel({ mascot, state }: CastMascotModelProps) {
  if (mascot === MascotId.Duke) {
    return <DukeModel state={state} />;
  }
  if (mascot === MascotId.DotnetBot) {
    return <DotnetBotModel state={state} />;
  }
  if (mascot === MascotId.Ferris) {
    return <FerrisModel state={state} />;
  }
  return <GopherModel state={state} />;
}
