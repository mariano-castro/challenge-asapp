import { BasePage } from "../pages/basePage"

const basePage = new BasePage()
const testUser = Cypress.env('testUser');

describe("ASAPP QA Challenge UI Tests", () => {

  it("1- Register a new user", () => {
    basePage.visitHome()
    cy.get(basePage.registerButton).click()
    cy.contains("Thank you!").should("be.visible")
    cy.get(basePage.usernameRegisterInput).type(testUser.username)
    cy.get(basePage.passwordRegisterInput).type(testUser.password)
    cy.get(basePage.registerConfirmationButton).click()
  })

  it("2- Login with valid credentials", () => {
    basePage.visitHome()
    basePage.login(testUser.username, testUser.password)
    cy.contains("button", "Log Out")
  })

  it("3- Add a product to the cart", () => {
    basePage.visitHome()
    basePage.login(testUser.username, testUser.password)
    basePage.addProduct()
    basePage.validateProductAdded()
  })

  it("4- Display a confirmation pop-up on purchase", () => {
    basePage.visitHome()
    basePage.login(testUser.username, testUser.password)
    basePage.addProduct()
    basePage.validateProductAdded()
    basePage.goToCart()   
    basePage.makeAPurchase() 
    basePage.validatePurchase()
  })

  it("5- Logout successfully", () => {
    basePage.visitHome()
    basePage.login(testUser.username, testUser.password)
    basePage.logout()
  })
})
