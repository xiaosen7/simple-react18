import { logger, indent } from "logger";
import { shouldSetTextContent } from "react-dom/client";
import { mountChildFibers, reconcileChildFibers } from "./childFibers";
import { Fiber } from "./Fiber";
import { processUpdateQueue } from "./fiberUpdateQueue";
import * as workTags from "./fiberWorkTags";

export function beginWork(alternate: Fiber, workInProgress: Fiber) {
  logger(" ".repeat(indent) + "beginWork", workInProgress);
  switch (workInProgress.tag) {
    case workTags.HostRoot:
      return updateHostRoot(alternate, workInProgress);
    case workTags.HostComponent:
      return updateHostComponent(alternate, workInProgress);
    case workTags.HostText:
    default:
      return null;
  }
}

function updateHostRoot(current, workInProgress) {
  processUpdateQueue(workInProgress);
  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;
  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function updateHostComponent(current, workInProgress) {
  const { type } = workInProgress;
  const nextProps = workInProgress.pendingProps;
  let nextChildren = nextProps.children;
  const isDirectTextChild = shouldSetTextContent(type, nextProps);
  if (isDirectTextChild) {
    nextChildren = null;
  }
  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function reconcileChildren(current, workInProgress, nextChildren) {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
  } else {
    // For the first time, current is RootFiber, so it will come in here.
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren
    );
  }
}
