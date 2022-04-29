import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return await this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) return null;

    const user = await this.repo.findOne(id);
    if (!user) {
      console.log('users service find one?');

      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async find(email: string) {
    return await this.repo.find({ email: email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return this.repo.remove(user);
  }
}
