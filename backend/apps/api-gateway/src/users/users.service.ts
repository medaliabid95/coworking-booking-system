import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../libs/database/src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(user: Partial<User>) {
    return this.repo.save(this.repo.create(user));
  }
  async findAll() {
    const users = await this.repo.find();
    return users.map((u) => {
      const { password, ...result } = u;
      return result;
  });
}

  async findOne(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) return null;
    const { password, ...result } = user;
    return result;
  }

  update(id: string, data: Partial<User>) {
    return this.repo.update(id, data);
  }
  remove(id: string) {
    return this.repo.delete(id);
  }
}
