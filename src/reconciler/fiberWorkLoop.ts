import { scheduleCallback } from "scheduler";
import { beginWork } from "./beginWork";
import { createWorkInProgress, Fiber } from "./Fiber";
import { NoFlags } from "./fiberFlags";
import { RootNode } from "./RootNoe";

let workInProgress: Fiber = null;

export function scheduleUpdateOnFiber(rootNode: RootNode) {
  scheduleCallback(() => performConcurrentWorkOnRoot(rootNode));
}

function performConcurrentWorkOnRoot(rootNode: RootNode) {
  renderRootSync(rootNode);
}

function prepareFreshStack(root) {
  workInProgress = createWorkInProgress(root.current, null);
  console.log(workInProgress);
}

function renderRootSync(rootNode: RootNode) {
  prepareFreshStack(rootNode);
  workLoopSync();
}

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork: Fiber) {
  const alternate = unitOfWork.alternate;
  const next = beginWork(alternate, unitOfWork);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) {
    workInProgress = null;
  } else {
    workInProgress = next;
  }
}
