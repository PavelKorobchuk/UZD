class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ForbiddenError extends MyError {
  constructor(message) {
    super(message || `You are not the author of this`);
  }
}
class NotFoundError extends MyError {
  constructor(property, message = "") {
    super(`${property} not found ${message}`);
  }
}
class UnauthorizedError extends MyError {
  constructor(message) {
    super(message || "You need to login first!");
  }
}

class ValidationError extends MyError {}

class FieldRequiredError extends ValidationError {
  constructor(field) {
    super(`${field} is required`);
  }
}

class AlreadyTakenError extends ValidationError {
  constructor(property, message = "") {
    super(`${property} already exists.. ${message}`);
  }
}

class InternalServerError extends ValidationError {
  constructor(message = "") {
    super(`${message}`);
  }
}

module.exports = {
  AlreadyTakenError,
  FieldRequiredError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  InternalServerError
};