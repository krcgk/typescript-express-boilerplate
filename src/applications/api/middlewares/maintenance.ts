import express, { NextFunction } from 'express'
import { MaintenanceEror } from '../../../lib/errors/commonErrors'
import { environment } from '../../../lib/framework/environment'

export const maintenanceMiddleware = async (req: express.Request, res: express.Response, next: NextFunction): Promise<void> => {
  const maintenanceMode = environment.maintenance

  if (maintenanceMode === true) {
    next(new MaintenanceEror())
  } else {
    next()
  }
}
