import { Fiber } from "./Fiber";

export class RootNode {
  containerInfo: any;
  current: Fiber;
  constructor(containerInfo) {
    this.containerInfo = containerInfo;
    this.current = null;
  }
}

export function createRootNode(containerInfo: HTMLElement) {
  return new RootNode(containerInfo);
}
