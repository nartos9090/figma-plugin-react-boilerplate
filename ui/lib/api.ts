export const api = (type: string, payload: any) => {
  parent.postMessage({ pluginMessage: { type, payload } }, "*");
};
