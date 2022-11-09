import { Request, Response } from 'express';

import { CreateUserService, ListAvailableUsersService } from '../services';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, birthday, email, password } = request.body;

    const createAccount = new CreateUserService();

    const user = await createAccount.execute({
      name,
      birthday,
      email,
      password,
    });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showUsers = new ListAvailableUsersService();

    const users = await showUsers.execute();

    return response.json(users);
  }
}
