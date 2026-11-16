import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useSceneLoading } from "@/scene/loading/scene-loading.store";
import { useViewActivity } from "@/scene/views/view-activity.store";

export function FrameloopGate() {
  const gl = useThree((state) => state.gl);
  const setFrameloop = useThree((state) => state.setFrameloop);
  const active = useViewActivity((activity) => activity.visible > 0);
  const ready = useSceneLoading((loading) => loading.ready);

  useEffect(() => {
    if (active || !ready) {
      setFrameloop("always");
      return;
    }
    gl.setScissorTest(false);
    gl.clear(true, true, false);
    setFrameloop("never");
  }, [active, ready, gl, setFrameloop]);

  return null;
}
