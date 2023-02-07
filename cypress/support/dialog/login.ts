import { NAVIGATION } from "../../elements/navigation";
import { LOGIN_SELECTORS } from "../../elements/login";
import { setCookie } from "../../../src/lib/cookie";
import config from "../../../src/config/config.json";

export function loginUsingForm(email: string, password: string) {
  cy.get(NAVIGATION.userIconLogin).click();
  cy.get(LOGIN_SELECTORS.signInForm).should("exist");

  cy.get(LOGIN_SELECTORS.emailInput).type(email);
  cy.get(LOGIN_SELECTORS.passwordInput).type(password);
  // cy.get(LOGIN_SELECTORS.passwordInput).type(password).type("{enter}");
  cy.get(LOGIN_SELECTORS.btnSubmitLogin).click();

  cy.location("pathname").should("include", "/account");

  cy.get(NAVIGATION.logoutBtn).click();
  cy.location("pathname").should("include", "/");
}

export function loginUsingAPI(email: string, password: string) {

  // Send request to the API login endpoint
  // cy.request({
  //   method: 'POST',
  //   url: "/api/account/login",
  //   body: { email, password },
  // }).then((res) => {
  //   // If successful, check to make sure usernames match
  //   // expect(res.body.username).to.eq(username);
  //
  //   // Set the cookie value for dolthubToken
  //   // cy.setCookie("dolthubToken", res.body.cookie_value);
  //   cy.log('dauphaihau', res)
  //   handleSetCookie(config.cookies.auth, res.auth)
  //   handleSetCookie(config.cookies.profile, res.profile)
  // });

  // cy.intercept('POST', '/api/account/login', { email, password }).as('login');
  // cy.wait('@login').then((res) => {
  //   cy.log('dauphaihau', res)
  // })

  // cy
  // .intercept({
  //   method: 'POST',
  //   url: '/api/account/login',
  // })
  // .as('login');
  // cy.wait('@login').then((res) => {
  //     cy.log('dauphaihau', res)
  // })

  // cy.request('POST', 'http://127.0.0.1:3000/api/account/login', {
  //   email, password
  // }).then((res) => {
  //   cy.log('dauphaihau', res)
  // })

  // Assert login successful by checking for existence of cookie
  cy.getCookie(config.cookies.auth).should("exist");
  cy.getCookie(config.cookies.profile).should("exist");
}
