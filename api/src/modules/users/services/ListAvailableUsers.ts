import { getCustomRepository, Like } from 'typeorm';

import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  nameSearch: string | undefined;
}

export default class ListAvailableUsersService {
  public async execute({ nameSearch }: IRequest): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!nameSearch || nameSearch !== '') {
      const users = await usersRepository.find({
        where: { is_deleted: false, name: Like(`%${nameSearch}%`) },
      });

      return users;
    }

    const users = await usersRepository.find({
      where: { is_deleted: false },
    });

    return users;
  }
}
