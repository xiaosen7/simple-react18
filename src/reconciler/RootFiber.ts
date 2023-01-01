import { Fiber } from "./Fiber";
import { HostRoot } from "./fiberWorkTags";

export function createRootFiber() {
  return new Fiber(HostRoot, null, null);
}
