import { authorize, domain, val } from 'plumier';
import { uniqueEmail } from '../validator/unique-email-validator';

export type UserRole = 'User' | 'Admin';

@domain()
export class Domain {
  constructor(
    @authorize.role('Machine')
    public id: number = 0,
    @authorize.role('Machine')
    public createdAt: Date = new Date(),
    public deleted: boolean = false,
  ) {}
}

@domain()
export class User extends Domain {
  constructor(
    @val.required()
    @val.email()
    @uniqueEmail()
    public email: string,
    @val.required()
    public password: string,
    @val.required()
    public name: string,
    @authorize.role('Admin')
    public role: UserRole = 'User',
  ) {
    super();
  }
}

@domain()
export class Todo extends Domain {
  constructor(
    @val.required()
    public todo: string,
    @authorize.role('Machine')
    public userId: number,
    public completed: boolean = false,
  ) {
    super();
  }
}

@domain()
export class LoginUser {
  constructor(public userId: number, public role: UserRole) {}
}
