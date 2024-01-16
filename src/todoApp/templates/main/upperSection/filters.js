import { VElement } from "../../../../../framework/VElement.js"

export const filtersSection = new VElement({
  tag: "ul",
  attrs: {
    class: "filters",
  },
  children: [
    new VElement({
      tag: "li",
      children: [
        new VElement({
          tag: "a",
          attrs: {
            class: "selected",
            href: "#/",
          },
          content: "All",
        }),
      ],
    }),
    new VElement({
      tag: "li",
      children: [
        new VElement({
          tag: "a",
          attrs: {
            class: "selected", // set attribute selected when the route is according to the button
            href: "#/active",
          },
          content: "Active",
        }),
      ],
    }),
    new VElement({
      tag: "li",
      children: [
        new VElement({
          tag: "a",
          attrs: {
            class: "selected",
            href: "#/completed",
          },
          content: "Completed",
        }),
      ],
    }),
    new VElement({
      tag: "button",
      attrs: {
        class: "clear-completed",
      },
      content: "Clear completed",
    }),
  ],
});