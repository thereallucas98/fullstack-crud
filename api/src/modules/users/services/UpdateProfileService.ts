import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
}

export default class UpdateProfileService {
  public async execute({ user_id, name, email }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not Found.');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is alread one user with this email.');
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}
