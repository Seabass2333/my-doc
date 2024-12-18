import { Extension } from "@tiptap/react";
import "@tiptap/extension/react"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSizeExtension = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"]
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize,
            renderHTML: attrs => {
              if (!attrs.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attrs.fontSize}`
              }
            }
          }
        }
      }
    ]
  },
})

