class InvalidPurchaseException extends Error {
  constructor(name, message) {
    super(name, message);
    this.name = name;
    this.message = message;
  }
  invalidPurchase() {
    return `${this.name}`;
  }
}

module.exports = { InvalidPurchaseException };
