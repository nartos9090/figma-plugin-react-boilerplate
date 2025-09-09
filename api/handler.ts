/// <reference types="@figma/plugin-typings" />

export const insertImage = (image: string) => {
  figma.createImageAsync(image).then((img) => {
    const rect = figma.createRectangle();
    rect.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: img.hash }];
    figma.currentPage.appendChild(rect);
    figma.viewport.scrollAndZoomIntoView([rect]);
  });
};
