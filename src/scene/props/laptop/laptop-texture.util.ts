import { CanvasTexture, SRGBColorSpace } from "three";
import { LAPTOP, LAPTOP_STICKERS } from "@/scene/props/laptop/laptop.constants";
import type { StickerSpec } from "@/scene/props/laptop/laptop.types";

let stickers: CanvasTexture | null = null;

function roundedRect(context: CanvasRenderingContext2D, width: number, height: number, radius: number): void {
  context.beginPath();
  context.roundRect(-width / 2, -height / 2, width, height, radius);
}

function drawSticker(context: CanvasRenderingContext2D, spec: StickerSpec, scale: number): void {
  const size = spec.size * scale;
  const fontSize = Math.round(size * (spec.shape === "circle" ? 0.5 : 0.62));
  context.save();
  context.translate(spec.x * LAPTOP.texture.width, spec.y * LAPTOP.texture.height);
  context.rotate(spec.angle);
  context.font = spec.font.replace("{size}", String(fontSize));
  const label = spec.text + (spec.accent ?? "");
  const width = spec.shape === "circle" ? size : Math.max(size * 1.4, context.measureText(label).width + size * 0.7);
  context.shadowColor = "rgba(17, 17, 20, 0.18)";
  context.shadowBlur = size * 0.08;
  context.shadowOffsetY = size * 0.03;
  context.fillStyle = "#ffffff";
  roundedRect(context, width + size * 0.08, size * 1.08, spec.shape === "circle" ? size : size * 0.28);
  context.fill();
  context.shadowColor = "transparent";
  context.fillStyle = spec.fill;
  roundedRect(context, width, size, spec.shape === "circle" ? size : size * 0.24);
  context.fill();
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = spec.ink;
  if (spec.accent === undefined) {
    context.fillText(spec.text, 0, size * 0.03);
  } else {
    const main = context.measureText(spec.text).width;
    const dot = context.measureText(spec.accent).width;
    const start = -(main + dot) / 2;
    context.textAlign = "left";
    context.fillText(spec.text, start, size * 0.03);
    context.fillStyle = "#00add8";
    context.fillText(spec.accent, start + main, size * 0.03);
  }
  context.restore();
}

function paint(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext("2d");
  if (context === null) {
    return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (const spec of LAPTOP_STICKERS) {
    drawSticker(context, spec, LAPTOP.texture.height);
  }
}

export function stickerTexture(): CanvasTexture {
  if (stickers !== null) {
    return stickers;
  }
  const canvas = document.createElement("canvas");
  canvas.width = LAPTOP.texture.width;
  canvas.height = LAPTOP.texture.height;
  paint(canvas);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  stickers = texture;
  void document.fonts.ready.then(() => {
    paint(canvas);
    texture.needsUpdate = true;
  });
  return texture;
}
