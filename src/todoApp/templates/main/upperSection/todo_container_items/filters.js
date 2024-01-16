import { VElement } from "../../../../../../framework/VElement.js"
import { router } from "../../../../app.js";

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
          "@click": (velm) => {
            router.routeTo("#/");
          },
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
          "@click": (velm) => {
            router.routeTo("#/active");
          },
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
          "@click": (velm) => {
            router.routeTo("#/completed");
          },
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