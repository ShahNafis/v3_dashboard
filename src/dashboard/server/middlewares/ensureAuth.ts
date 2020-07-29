import { Request, Response, NextFunction } from 'express'
import { log } from '../utils/logger'

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    log({
      message: `User ${req.user.id} authenticated for path ${req.route.path}`,
      type: 'ok',
    })
    return next()
  }

  log({
    message: `Not authenticated for path ${req.route.path}`,
    type: 'error',
  })
  res.status(401).json({
    success: false,
    message: `Not authenticated`,
  })
}

export { ensureAuthenticated }
