/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'greet') {
    figma.notify(msg.text);
  }
}