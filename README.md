# ASAPP QA Automation Challenge

## 🚀 Project Overview

This project implements automated end-to-end tests for the ASAPP QA Automation Challenge. Using Cypress, we validate critical user flows in a sample web application, including user registration, login, shopping cart interactions, and logout functionality.

## ✏️ Prerequisites

To set up and run this project, ensure you have the following installed:

-Node.js 

-Docker 

## 📁 Project Setup

**1. Clone the Repository**

Clone the source code for the web application and navigate to the directory:

`git clone https://github.com/mariano-castro/challenge-asapp.git`

**2. Start the Web Application**

The web application is provided in a Docker setup. Run the following commands to build and start the services:

`docker build ./src/api -t asapp-qa-challenge-api`
`docker build ./src/ui -t asapp-qa-challenge-ui`
`docker-compose up -d`

Verify the following URLs:

UI: http://localhost:3000

API Docs: http://localhost:5000/api/docs

**3. Initialize the Test Environment**

Install dependencies:

`npm install`

**4. Run Tests**

Execute all tests in headless mode:

`npx cypress run`

Alternatively, launch the Cypress Test Runner for an interactive experience:

`npx cypress open`