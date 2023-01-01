export function scheduleCallback(cb) {
  requestIdleCallback(cb);
}
