import { createContext } from "react";
import type { ViewVisibility } from "@/scene/views/mascot-view.interfaces";

export const ViewVisibilityContext = createContext<ViewVisibility>({ current: true });
