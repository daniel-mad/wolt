import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../../db';
import { User } from '../models/user.type';
import LoginValidation from '../validations/login.validation';
import RegisterValidation from '../validations/register.validation';

export const Register = async (req: Request, res: Response) => {
  const body: User = req.body;
  const { error } = RegisterValidation.validate(body);
  if (error) return res.status(400).send({ message: error.details });
  if (body.password !== body.password_confirm)
    return res.status(400).send({ message: 'password do not match!' });
  try {
    const found = db.findByEmail(body.email);
    if (found) return res.status(409).send({ message: 'User already exists' });
    const user = db.Add({
      ...body,
      password: await bcrypt.hash(body.password, 10),
    });
    return res.status(201).send(user);
  } catch (e) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const Login = async (req: Request, res: Response) => {
  const body: User = req.body;
  const { error } = LoginValidation.validate(body);
  if (error) return res.status(400).send({ message: error.details });
  try {
    const found = db.findByEmail(body.email);
    if (!found || !(await bcrypt.compare(body.password, found.password)))
      return res.status(401).send({ message: 'Incorrect email or password' });

    const token = sign({ id: found.id }, process.env.JWT_SECRET as string);
    res.cookie('jwt', token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    return res.status(200).send({ token });
  } catch (e: Error | any) {
    return res.status(500).send({ message: e.message });
  }
};

export const Profile = async (req: Request | any, res: Response) => {
  const { password, ...user } = req.user;
  return res.status(200).send();
};

export const GetUsers = async (req: Request | any, res: Response) => {
  try {
    const users = db.getUsers();
    res.status(200).send(users);
  } catch (e: Error | any) {
    return res.status(500).send({ message: e.message });
  }
  return res.status(200).send(req.user);
};
