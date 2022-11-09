import { Request, Response } from 'express';

import {
  ShowProfileService,
  UpdatePasswordService,
  UpdateProfileService,
} from '../services';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const user_id = request.user.id;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
    });

    return response.json(user);
  }

  public async password(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { password, old_password } = request.body;

    const user_id = request.user.id;

    const updatePassword = new UpdatePasswordService();

    const user = await updatePassword.execute({
      user_id,
      password,
      old_password,
    });

    return response.json(user);
  }
}
