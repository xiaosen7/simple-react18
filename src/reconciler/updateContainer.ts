import { createUpdate, enqueueUpdate } from "./fiberUpdateQueue";
import { RootNode } from "./RootNoe";
import { scheduleUpdateOnFiber } from "./fiberWorkLoop";

export function updateContainer(element, rootNode: RootNode) {
  const current = rootNode.current;

  // Save element into current rootFiber.updateQueue.
  const update = createUpdate();
  update.payload = { element };
  enqueueUpdate(current, update);

  scheduleUpdateOnFiber(rootNode);
}
