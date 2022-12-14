import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

export default class SoftDeleteService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not Found.');
    }

    // user.is_deleted = true;

    await usersRepository.remove(user);

    return user;
  }
}
