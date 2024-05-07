export function isVNode(node: unknown): boolean {
  return (
    node !== null &&
    typeof node === "object" &&
    Object.prototype.hasOwnProperty.call(node, "componentOptions")
  );
}
