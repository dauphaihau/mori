import { accountToLogin } from "../fixtures/login";
import { loginUsingAPI, loginUsingForm } from "../support/dialog/login";

describe("Search for products", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login - get token - logout", () => {
    loginUsingForm(accountToLogin.email, accountToLogin.password)
    // loginUsingAPI(accountToLogin.email, accountToLogin.passwordEncrypted)
  });
})
