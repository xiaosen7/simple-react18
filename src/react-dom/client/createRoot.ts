import type { ReactElement } from "react";
import { createRootFiber, createRootNode, updateContainer } from "reconciler";

export function createRoot(containerInfo: HTMLElement) {
  console.log("createRoot", arguments);

  const rootNode = createRootNode(containerInfo);
  const rootFiber = createRootFiber();

  rootNode.current = rootFiber;
  rootFiber.stateNode = rootNode;

  const root = {
    _internalRoot: rootNode,
    render(element: ReactElement) {
      console.log("render", arguments);

      rootNode.containerInfo.innerHTML = "";
      updateContainer(element, rootNode);
    },
  };

  return root;
}

export default {
  createRoot,
};
