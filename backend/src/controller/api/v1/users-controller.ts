import bcrypt from 'bcrypt';
import { authorize, route } from 'plumier';

import { db } from '../../../model/db';
import { User } from '../../../model/domain';

function ownerOrAdmin() {
  return authorize.custom(async ({ role, user, metadata }) => {
    return role.some((x) => x === 'Admin') || metadata.actionParams.get('id') === user.userId;
  }, 'Admin|Owner');
}

export class UsersController {
  // GET /api/v1/users?offset=<number>&limit=<number>
  @authorize.role('Admin')
  @route.get('')
  list(offset: number, limit: number) {
    return db('User')
      .where({ deleted: 0 })
      .offset(offset || 0)
      .limit(limit || 100)
      .orderBy('createdAt', 'desc');
  }

  // GET /api/v1/users/:id
  @ownerOrAdmin()
  @route.get(':id')
  get(id: number) {
    return db('User').where({ id }).first();
  }

  // PUT /api/v1/users/:id
  @ownerOrAdmin()
  @route.put(':id')
  async modify(id: number, data: User) {
    const password = await bcrypt.hash(data.password, 10);
    return db('User')
      .update({ ...data, password })
      .where({ id });
  }

  // DELETE /api/v1/users/:id
  @ownerOrAdmin()
  @route.delete(':id')
  delete(id: number) {
    return db('User').update({ deleted: 1 }).where({ id });
  }
}
