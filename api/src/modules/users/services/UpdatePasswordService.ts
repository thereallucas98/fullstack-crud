import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  password: string;
  old_password: string;
}

export default class UpdatePasswordService {
  public async execute({
    user_id,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not Found.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    await usersRepository.save(user);

    return user;
  }
}
