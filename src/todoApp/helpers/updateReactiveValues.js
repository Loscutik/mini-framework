import { updateFooterDisplaycompletedCount } from "../templates/main/insideUpperSection/footer_items/filters.js";
import { updateActiveCount } from "../templates/main/insideUpperSection/footer_items/todoCount.js";
import { updateFooterActiveCount } from "../templates/main/upperSectionMain.js";

export function updateReactiveValues() {
    updateActiveCount()
    updateFooterDisplaycompletedCount()
    updateFooterActiveCount()
}


