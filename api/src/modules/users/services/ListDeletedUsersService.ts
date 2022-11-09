import { getCustomRepository } from 'typeorm';

import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

export default class ListDeletedUsersService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find({ where: { is_deleted: true } });

    return users;
  }
}
