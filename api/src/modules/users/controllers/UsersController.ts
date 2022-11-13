import { Request, Response } from 'express';

import {
  CreateUserService,
  ListAvailableUsersService,
  ListDeletedUsersService,
  RestoreUserService,
  SoftDeleteService,
} from '../services';

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
    const { name_search } = request.query;

    const showUsers = new ListAvailableUsersService();

    const users = await showUsers.execute({ nameSearch: String(name_search) });

    return response.json(users);
  }

  public async deletedOnes(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const showDeletedUsers = new ListDeletedUsersService();

    const users = await showDeletedUsers.execute();

    return response.json(users);
  }

  public async softDelete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const softDelete = new SoftDeleteService();

    const users = await softDelete.execute({ user_id: id });

    return response.json(users);
  }

  public async restoreUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const softDelete = new RestoreUserService();

    const users = await softDelete.execute({ user_id: id });

    return response.json(users);
  }
}
