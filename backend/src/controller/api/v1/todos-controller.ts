import { bind, route, authorize, response } from 'plumier';

import { db } from '../../../model/db';
import { LoginUser, Todo } from '../../../model/domain';

function ownerOrAdmin() {
  return authorize.custom(async ({ role, metadata, user }) => {
    const todo: Todo = await db('Todo')
      .where({ id: metadata.actionParams.get('id') })
      .first();
    return role.some((x) => x === 'Admin') || (todo && todo.userId === user.userId);
  }, 'Admin|Owner');
}

export class TodosController {
  // POST /api/v1/todos
  @route.post('')
  save(data: Todo, @bind.user() user: LoginUser) {
    return db('Todo')
      .insert(<Todo>{ ...data, userId: user.userId })
      .then(() => response.json(data))
      .catch((err) => response.json(`Error: ${err}`).setStatus(400));
  }

  // GET /api/v1/todos?offset=<number>&limit=<number>
  @route.get('')
  list(offset: number, limit: number) {
    return db('Todo')
      .where({ deleted: 0 })
      .offset(offset || 0)
      .limit(limit || 100)
      .orderBy('createdAt', 'desc');
  }

  // PUT /api/v1/todos/:id
  @ownerOrAdmin()
  @route.put(':id')
  modify(id: number, data: Todo) {
    return db('Todo')
      .update(data)
      .where({ id })
      .then(() => response.json(data));
  }

  // DELETE /api/v1/todos/:id
  @ownerOrAdmin()
  @route.delete(':id')
  delete(id: number) {
    return db('Todo').update({ deleted: true }).where({ id });
  }
}
