

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(authToken?: string): Chainable<Element>;
      logout(): Chainable<Element>;
    }
  }
}

export default global;
