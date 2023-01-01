import { REACT_ELEMENT_TYPE } from "shared";

export function jsxDEV(type, config, key) {
  const { ref, ...props } = config;
  return createElement(type, key, ref, props);
}

export function createElement(type, key, ref, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  };
}
