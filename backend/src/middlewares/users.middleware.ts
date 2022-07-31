import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { db } from '../../db';

export const Auth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies['jwt'];
    const payload: any = verify(jwt, process.env.JWT_SECRET as string);
    const user = db.findById(payload.id);
    if (!user) throw new Error('Invalid credentials');

    req['user'] = user;

    next();
  } catch (err: Error | any) {
    return res.status(401).send({
      message: 'Unauthenticated',
      error: err.message,
    });
  }
};
