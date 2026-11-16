import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { STUDIO_LIGHTS } from "@/scene/lighting/studio-lights.constants";
import { studioEnvironment } from "@/scene/lighting/studio-environment.util";

export function StudioLights() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    scene.environment = studioEnvironment(gl);
    scene.environmentIntensity = STUDIO_LIGHTS.environment;
  }, [gl, scene]);

  return (
    <>
      <hemisphereLight args={[STUDIO_LIGHTS.sky, STUDIO_LIGHTS.ground, STUDIO_LIGHTS.hemisphere]} />
      <directionalLight position={STUDIO_LIGHTS.key.position} intensity={STUDIO_LIGHTS.key.intensity} color={STUDIO_LIGHTS.key.color} />
      <directionalLight position={STUDIO_LIGHTS.rim.position} intensity={STUDIO_LIGHTS.rim.intensity} color={STUDIO_LIGHTS.rim.color} />
    </>
  );
}
