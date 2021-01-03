import express, { NextFunction } from 'express'

export const apiRouter = express.Router({
  mergeParams: true
})

apiRouter.get('/', [
  //
], async (req: express.Request, res: express.Response, next: NextFunction) => {
  try {
    //
  } catch (err){
    next (err)
  }
})

