import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    try {
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    return user;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please Check server logs');
  }
}
