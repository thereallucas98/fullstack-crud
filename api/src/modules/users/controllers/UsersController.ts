import { Request, Response } from 'express';

import { ListAvailableUsersService } from '../services';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showUsers = new ListAvailableUsersService();

    const users = await showUsers.execute();

    return response.json(users);
  }
}
