export class BasePage {
  constructor() {
    this.usernameRegisterInput = "#register-username"
    this.passwordRegisterInput = "#register-password"
    this.usernameInput = "#username"
    this.passwordInput = "#password"
    this.registerButton = ":nth-child(3) > .MuiButton-label"
    this.registerConfirmationButton = ".MuiDialogActions-root > .MuiButtonBase-root > .MuiButton-label"
    this.loginButton = ":nth-child(2) > .MuiButton-label"
    this.productAddedAlert = "#snackbar-fab-message-id"
    this.cartButton = ":nth-child(2) > .MuiTab-wrapper"
    this.purchasecartButton = ".buy-button > .MuiButtonBase-root"
    this.quantityDropdown = ":nth-child(1) > .MuiCardActions-root > .MuiInputBase-root > .MuiSelect-root"
    this.quantityOneValue = '[data-value="1"]'
    this.addToCartButton = ':nth-child(1) > .MuiCardActions-root > [data-test-name="add-to-cart-button"] > .MuiButton-label'
  }
  visitHome() {
    cy.visit("/")
  }

  fillUsername(username) {
    cy.get(this.usernameInput).type(username)
  }

  fillPassword(password) {
    cy.get(this.passwordInput).type(password)
  }

  submit() {
    cy.get(this.loginButton).click()
  }

  login(username, password) {
    this.fillUsername(username)
    this.fillPassword(password)
    this.submit()
  }

  logout() {
    cy.get("button").contains("Log Out").click()
    cy.contains("Please Login").should("be.visible")
  }

  addProduct() {
    cy.get(this.quantityDropdown).click()
    cy.get(this.quantityOneValue).click()
    cy.get(this.addToCartButton).click()
  }

  validateProductAdded() {
    cy.get(this.productAddedAlert).should("be.visible").contains("Product Added to Cart")
  }

  goToCart() {
    cy.get(this.cartButton).click()
  }

  makeAPurchase() {
    cy.get(this.purchasecartButton).click()
  }

  validatePurchase() {
    cy.contains("Thank you!").should("be.visible")
  }
}
