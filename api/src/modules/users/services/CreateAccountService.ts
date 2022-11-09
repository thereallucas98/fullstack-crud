import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import { User } from '@modules/users/typeorm/entities/User';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  birthday: string;
  password: string;
}

class CreateAccountService {
  public async execute({
    name,
    email,
    birthday,
    password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const usernameExists = await usersRepository.findByUsername(name);

    if (usernameExists) {
      throw new AppError('Username already used');
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already used by another user');
    }

    const hashedPassword = await hash(password, 8);

    const registryTimestamp = new Date().getTime();

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      birthday,
      registry: `${registryTimestamp}`,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateAccountService;
