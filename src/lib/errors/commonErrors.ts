import { BaseError, HttpStatusCode } from "./baseError"

export class ApiError extends BaseError {
  constructor(
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    message = 'An error occured',
    name = 'ApiError',
    isOperational = true
  ) {
    super(httpCode, message, name, isOperational)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Access is denied', name = 'Unauthorized') {
    super(HttpStatusCode.UNAUTHORIZED, message, name)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'You don\t have permission to access', name = 'Forbidden') {
    super(HttpStatusCode.FORBIDDEN, message, name)
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Content not found', name = 'NotFound') {
    super(HttpStatusCode.NOT_FOUND, message, name)
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor(message = 'Method not allowed', name = 'InvalidHttpMethod') {
    super(HttpStatusCode.METHOD_NOT_ALLOWED, message, name)
  }
}

export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', name = 'RequestNotValidated') {
    super(HttpStatusCode.UNPROCESSABLE_ENTITY, message, name)
  }
}

export class MaintenanceEror extends ApiError {
  constructor(message = 'Maintenance mode activated, please try again later', name = 'MaintenanceEnabled') {
    super(HttpStatusCode.SERVICE_UNAVAILABLE, message, name)
  }
}
