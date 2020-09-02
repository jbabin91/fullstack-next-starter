import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { HttpStatusError, route, authorize, ActionResult } from 'plumier';
import cookie from 'cookie';

import { db } from '../model/db';
import { LoginUser, User } from '../model/domain';

export class AuthController {
  // POST /login
  @authorize.public()
  @route.post()
  async login(email: string, password: string) {
    const user: User | undefined = await db('User').where({ email }).first();
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = sign(<LoginUser>{ userId: user.id, role: user.role }, process.env.JWT_SECRET!);
      // return { token };
      return new ActionResult({ message: 'Logged in' }).setCookie(
        cookie.serialize('Authorization', token, {
          httpOnly: process.env.NODE_ENV !== 'development',
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/',
        }),
      );
    } else throw new HttpStatusError(403, 'Invalid username or password');
  }

  // POST /signup
  @authorize.public()
  @route.post()
  async signup(data: User) {
    const password = await bcrypt.hash(data.password, 12);
    return db('User').insert({ ...data, password, role: 'User' });
  }
}
