import { PMREMGenerator, type Texture, type WebGLRenderer } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

let cached: Texture | null = null;

export function studioEnvironment(renderer: WebGLRenderer): Texture {
  if (cached !== null) {
    return cached;
  }
  const generator = new PMREMGenerator(renderer);
  cached = generator.fromScene(new RoomEnvironment(), 0.035).texture;
  generator.dispose();
  return cached;
}
