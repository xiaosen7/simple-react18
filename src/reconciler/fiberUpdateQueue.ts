import { UpdateState } from "./const";
import { Fiber } from "./Fiber";
import { markUpdateLaneFromFiberToRoot } from "./markUpdateLaneFromFiberToRoot";

export function enqueueUpdate(fiber: Fiber, update) {
  const updateQueue = fiber.updateQueue;
  const sharedQueue = updateQueue.shared;
  const pending = sharedQueue.pending;

  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }

  updateQueue.shared.pending = update;

  return markUpdateLaneFromFiberToRoot(fiber);
}

export function createUpdate() {
  const update = { tag: UpdateState, payload: null };
  return update;
}

/**
 * Process the fiber.updateQueue to get the state to revalue into fiber.memoizedState.
 *
 * At last, clear fiber.updateQueue.
 *
 * @param workInProgress
 */
export function processUpdateQueue(workInProgress: Fiber) {
  const updateQueue = workInProgress.updateQueue;
  const pendingQueue = updateQueue.shared.pending;
  if (pendingQueue !== null) {
    const lastPendingUpdate = pendingQueue;
    const firstPendingUpdate = lastPendingUpdate.next;

    // Breakup the circle.
    lastPendingUpdate.next = null;

    // Merge.
    let state = workInProgress.memoizedState;
    let update = firstPendingUpdate;
    while (update) {
      state = getStateFromUpdate(update, state);
      update = update.next;
    }

    // Revalue into memoizedState.
    workInProgress.memoizedState = state;

    // Clear queue.
    updateQueue.shared.pending = null;
  }
}

function getStateFromUpdate(update, prevState) {
  switch (update.tag) {
    case UpdateState: {
      // payload maybe: { element }
      const { payload } = update;
      return Object.assign({}, prevState, payload);
    }

    default:
      return prevState;
  }
}
