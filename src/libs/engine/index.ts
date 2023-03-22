export const defaults = {
  namespace: "codingland"
}

export function join(namespace: string, ...append: string[]): string {
  if(namespace.endsWith(":")) {
    return `${namespace}${append.join(".")}`
  } else {
    return `${namespace}:${append.join(".")}`
  }
}