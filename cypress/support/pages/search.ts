import { NAVIGATION } from "../../elements/navigation";
import { SEARCH_PAGE_SELECTORS } from "../../elements/search-page";

export function navigateAndSearch(typedText) {
  cy.wrap(typedText).as('ProductCollection')
  // cy.addAliasForSearchQuery("ProductCollection", typedText)
  .get(NAVIGATION.searchIcon)
  .click()
  .get(SEARCH_PAGE_SELECTORS.searchInput)
  .type(typedText, { delay: 300 })
  .should("have.value", typedText)
  // .wait(300)
  // .wait("@ProductCollection");
}
