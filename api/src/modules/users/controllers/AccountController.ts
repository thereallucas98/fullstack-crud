import { Request, Response } from 'express';

import { CreateAccountService, DeleteAccountService } from '../services';

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const updateProfile = new DeleteAccountService();

    const user = await updateProfile.execute({
      user_id,
    });

    return response.json({ message: `${user.name} was deleted` });
  }
}
