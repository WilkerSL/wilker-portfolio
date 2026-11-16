import { PerspectiveCamera, View } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import type { PerspectiveCamera as Camera } from "three";
import { StudioLights } from "@/scene/lighting/studio-lights.component";
import { VIEW_VISIBILITY_MARGIN } from "@/scene/views/cursor-follow.constants";
import { fitCameraWidth } from "@/scene/views/frame-camera.util";
import { useViewActivity } from "@/scene/views/view-activity.store";
import { ViewVisibilityContext } from "@/scene/views/view-visibility.context";
import type { MascotViewProps, ViewCameraRigProps } from "@/scene/views/mascot-view.interfaces";

function ViewCameraRig({ camera }: ViewCameraRigProps) {
  const ref = useRef<Camera>(null);
  const visible = useContext(ViewVisibilityContext);

  useLayoutEffect(() => {
    ref.current?.lookAt(...camera.target);
  }, [camera]);

  useFrame(() => {
    if (visible.current && ref.current !== null && camera.width !== undefined) {
      fitCameraWidth(ref.current, camera, camera.width);
    }
  });

  return <PerspectiveCamera ref={ref} makeDefault position={[...camera.position]} fov={camera.fov} near={0.1} far={60} />;
}

export function MascotView({ camera, className = "relative", children, ref, onPointerEnter, onClick }: MascotViewProps) {
  const tracked = useRef<HTMLDivElement>(null);
  const visible = useRef({ current: true }).current;

  useEffect(() => {
    const element = tracked.current;
    if (element === null) {
      return;
    }
    const { show, hide } = useViewActivity.getState();
    let counted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry?.isIntersecting ?? true;
        visible.current = inView;
        if (inView !== counted) {
          counted = inView;
          if (inView) {
            show();
          } else {
            hide();
          }
        }
      },
      { rootMargin: VIEW_VISIBILITY_MARGIN },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (counted) {
        hide();
      }
    };
  }, [visible]);

  return (
    <div ref={ref} aria-hidden="true" className={className} onPointerEnter={onPointerEnter} onClick={onClick}>
      <View ref={tracked} className="absolute inset-0">
        <ViewVisibilityContext.Provider value={visible}>
          <ViewCameraRig camera={camera} />
          <StudioLights />
          {children}
        </ViewVisibilityContext.Provider>
      </View>
    </div>
  );
}
