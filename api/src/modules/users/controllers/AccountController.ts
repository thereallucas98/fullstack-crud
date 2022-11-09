import { Request, Response } from 'express';

import { CreateAccountService } from '../services';

export default class AccountController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, birthday, email, password } = request.body;

    const createAccount = new CreateAccountService();

    const user = await createAccount.execute({
      name,
      birthday,
      email,
      password,
    });

    return response.json(user);
  }
}
