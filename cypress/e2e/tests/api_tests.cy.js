import { faker } from "@faker-js/faker"

const apiUrl = Cypress.env("apiUrl")
const testUser = Cypress.env("testUser")
const uniqueUser = faker.internet.email()

describe("ASAPP QA Challenge API Tests - Without login", () => {
  it("1- Register a new user", () => {
    cy.request("POST", `${apiUrl}/users/register`, {
      username: uniqueUser,
      password: testUser.password,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.equal("User created successfully")
    })
  })
})

describe("ASAPP QA Challenge API Tests - With login", () => {
  beforeEach(() => {
    cy.loginSuccesful(testUser.username, testUser.password)
  })

  it("2- Login with valid credentials", () => {
    cy.request("POST", `${apiUrl}/users/login`, {
      username: testUser.username,
      password: testUser.password,
    }).then((response) => {
      console.log(response.body)
      expect(response.status).to.eq(200)
      expect(response.body).to.equal("Login succeeded.")
    })
  })

  it("3- Get the full inventory list", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/${testUser.username}/products`,
    }).then((response) => {
      console.log(response.body)
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body.length).to.be.greaterThan(0)
    })
  })

  it("4- Add a product to the cart", () => {
    const productName = "ASAPP Pens"
    cy.request({
      method: "POST",
      url: `${apiUrl}/${testUser.username}/products/${productName}/add`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        quantity: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.contains(" added to cart")
    })
  })

  it("5- Get the current cart", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/${testUser.username}/products/cart`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body)
      expect(response.body).to.be.an("array")
      const productInCart = response.body.find((product) => product.product_name === "ASAPP Pens")
      console.log(productInCart)
      expect(productInCart).to.exist
      expect(productInCart).to.have.property("product_qty", 1)
      expect(productInCart).to.have.property("cart_owner", testUser.username)
    })
  })

  it("6- Checkout all products in the cart", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/${testUser.username}/products/cart/checkout`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.equal("Checkout successful! Thank you for shopping with us.")
    })
  })

  it("7- Log out the current session", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/users/logout`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: testUser.username,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.equal("Logout succeeded.")
    })
  })
})
