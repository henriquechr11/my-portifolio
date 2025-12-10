let _z = 1000;
export function bringToFront() {
  _z += 1;
  return _z;
}

export function getCurrentZ() {
  return _z;
}
