import { NoFlags } from "./fiberFlags";
import {
  HostComponent,
  HostText,
  IndeterminateComponent,
} from "./fiberWorkTags";

export class Fiber {
  tag: any;
  key: any;
  type: any;
  stateNode: any;
  return: any;
  child: any;
  sibling: any;
  pendingProps: any;
  memoizedProps: any;
  memoizedState: any;
  alternate: any;
  updateQueue: { shared: { pending: any } };
  flags: number;
  subtreeFlags: number;
  index: number;

  constructor(tag, pendingProps, key) {
    this.tag = tag;
    this.key = key;
    this.type = null;
    this.stateNode = null;

    this.return = null;
    this.child = null;
    this.sibling = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = {
      shared: {
        pending: null,
      },
    };
    this.memoizedState = null;

    this.flags = NoFlags;
    this.subtreeFlags = NoFlags;
    this.alternate = null;

    this.index = 0;
  }
}

export function createFiberFromElement(element) {
  const { type } = element;
  const { key } = element;
  const pendingProps = element.props;

  let fiberTag =
    typeof type === "string" ? HostComponent : IndeterminateComponent;
  const fiber = new Fiber(fiberTag, pendingProps, key);
  fiber.type = type;

  return fiber;
}

// We use a double buffering pooling technique because we know that we'll
// only ever need at most two versions of a tree. We pool the "other" unused
// node that we're free to reuse. This is lazily created to avoid allocating
// extra objects for things that are never updated. It also allow us to
// reclaim the extra memory if needed.
// 我们使用双缓冲池技术，因为我们知道一棵树最多只需要两个版本
// 我们将“其他”未使用的我们可以自由重用的节点
// 这是延迟创建的，以避免分配从未更新的内容的额外对象。它还允许我们如果需要，回收额外的内+存
export function createWorkInProgress(current: Fiber, pendingProps) {
  let workInProgress = current.alternate;
  if (workInProgress === null) {
    workInProgress = new Fiber(current.tag, pendingProps, current.key);
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;

    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.type = current.type;
    workInProgress.flags = NoFlags;
    workInProgress.subtreeFlags = NoFlags;
  }

  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;

  return workInProgress;
}

export function createFiberFromText(content) {
  return new Fiber(HostText, content, null);
}
