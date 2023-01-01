import { Fiber } from "./Fiber";
import { HostRoot } from "./fiberWorkTags";
import { RootNode } from "./RootNoe";

/**
 * 目前只是返回 RootNode 的作用
 * @param fiber
 * @returns
 */
export function markUpdateLaneFromFiberToRoot(fiber: Fiber): RootNode {
  let node = fiber;
  let parent = fiber.return;

  while (parent !== null) {
    node = parent;
    parent = parent.return;
  }

  if (node.tag === HostRoot) {
    const root = node.stateNode;
    return root;
  }

  return null;
}
