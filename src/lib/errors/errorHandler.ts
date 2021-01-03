import { ioc } from "../utils"
import { BaseError } from "./baseError"

class ErrorHandler {
  public async handleError(error: Error): Promise<void> {
    ioc.logger.error(
      'Error message from the centralized error-handling component',
      error
    )
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational
    }

    return false
  }
}

export const errorHandler = new ErrorHandler()
