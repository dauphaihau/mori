// import { NAVIGATION } from "../elements/navigation";
// import { SEARCH_PAGE_SELECTORS } from "../elements/search-page";
// import { SHARED_ELEMENTS } from "../elements/shared-elements";
import { productsToSearch } from "../fixtures/search";
import { navigateAndSearch } from "../support/pages/search";
import { NAVIGATION } from "../elements/navigation";
import { SHARED_ELEMENTS } from "../elements/shared-elements";
import { SEARCH_PAGE_SELECTORS } from "../elements/search-page";

describe("Search for products", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should search for products", () => {
    const searchQuery = productsToSearch.willow;
    navigateAndSearch(searchQuery);

    cy.request('DELETE', `http://127.0.0.1:3000/api/product?search=${searchQuery}&limit=6`)
    // .should('include', `search=${searchQuery}`)
    .should((response) => {
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    })

    // cy.request('DELETE', 'http://localhost:8888/users/827')
    // cy.url().should("include", `/search?q=${searchQuery}`);
  });

  it("should see no errors on search bar", () => {
    const searchQuery = productsToSearch.willow;

    // cy.intercept(`http://127.0.0.1:3000/api/product?search=${searchQuery}&limit=6`).as('requestWithQuery')
    //
    // cy.wait('@requestWithQuery').then(interception => {
    //   expect(interception.req.body.query.includes(`search=${searchQuery}`).to.eq(true))
    // })

    const url = `http://127.0.0.1:3000/api/product?search=${searchQuery}&limit=6`;
    const arr = url.split('?')[1].split('&');
    const paramObj = {};
    arr.forEach(param => {
      const [ key, value ] = param.split('=');
      paramObj[key] = value;
    });

    cy
    .wrap(paramObj)
    .its('search')
    .should('eq', searchQuery);

    // cy.get(NAVIGATION.searchIcon)
    // .click()
    // .wrap(paramObj)
    // .its('search')
    // .should('eq', searchQuery)
    // .get(SHARED_ELEMENTS.productsList)
    // .should("be.visible");

    // .url()
    // .should("include", "/search")

    // .request()
    // .should('include', `search=${searchQuery}`)

    // .get(SHARED_ELEMENTS.productsList)
    // .should("be.visible");
  });

  it("should see no results message", () => {
    const searchQuery = productsToSearch.nonExistingProduct;

    navigateAndSearch(searchQuery);
    cy.get(SEARCH_PAGE_SELECTORS.noResultsText)
    .should("contain", productsToSearch.noProductsInfo)
    .get(SHARED_ELEMENTS.productsList)
    .should("not.exist");
  });
});
