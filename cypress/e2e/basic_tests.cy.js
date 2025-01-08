import { BasePage } from "./pages/basePage"

const basePage = new BasePage()
let validUser

describe("ASAPP QA Challenge Tests", () => {
  before(() => {
    cy.fixture("users").then((users) => {
      validUser = users.validUser
    })
  })

  it("Register a new user", () => {
    basePage.visitHome()
    cy.get(basePage.registerButton).click()
    cy.contains("Thank you!").should("be.visible")
    cy.get(basePage.usernameRegisterInput).type(validUser.email)
    cy.get(basePage.passwordRegisterInput).type(validUser.password)
    cy.get(basePage.registerConfirmationButton).click()
  })

  it("Login with valid credentials", () => {
    basePage.visitHome()
    basePage.login(validUser.email, validUser.password)
    cy.contains("button", "Log Out")
  })

  it("Add a product to the cart", () => {
    basePage.visitHome()
    basePage.login(validUser.email, validUser.password)
    basePage.addProduct()
    basePage.validateProductAdded()
  })

  it("Display a confirmation pop-up on purchase", () => {
    basePage.visitHome()
    basePage.login(validUser.email, validUser.password)
    basePage.addProduct()
    basePage.validateProductAdded()
    basePage.goToCart()   
    basePage.makeAPurchase() 
    basePage.validatePurchase()
  })

  it("Logout successfully", () => {
    basePage.visitHome()
    basePage.login(validUser.email, validUser.password)
    basePage.logout()
  })
})
