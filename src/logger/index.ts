import * as workTags from "reconciler/fiberWorkTags";

export let indent = 0;

const ReactWorkTagsMap = new Map();

for (let tag in workTags) {
  ReactWorkTagsMap.set(workTags[tag], tag);
}

export function logger(prefix, workInProgress) {
  let tagValue = workInProgress.tag;
  let tagName = ReactWorkTagsMap.get(tagValue);
  let str = ` ${tagName} `;
  if (tagName === "HostComponent") {
    str += ` ${workInProgress.type} `;
  } else if (tagName === "HostText") {
    str += ` ${workInProgress.pendingProps} `;
  }
  console.log(`${prefix} ${str}`);
}
