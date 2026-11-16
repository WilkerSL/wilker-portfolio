import { useFrame, useThree } from "@react-three/fiber";

export function FrameClear() {
  const gl = useThree((state) => state.gl);

  useFrame(() => {
    gl.setScissorTest(false);
    gl.clear(true, true, false);
  });

  return null;
}
