export interface AmbientRig {
  readonly output: GainNode;
  readonly filter: BiquadFilterNode;
  readonly sources: AudioScheduledSourceNode[];
  readonly pads: OscillatorNode[][];
  readonly timers: number[];
  chord: number;
  activity: number;
  lastScroll: number;
  lastTime: number;
  frame: number;
}
