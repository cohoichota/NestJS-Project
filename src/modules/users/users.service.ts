import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { hashPasswordHelper } from 'src/helpers/bcrypt.util';
import { paginate, PaginationResult } from 'src/helpers/pagination.util';
import { BaseService } from 'src/common/services/base.service';
import { CustomApiResponse } from 'src/interfaces/response.interface';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly baseService: BaseService,
  ) {}

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { name, email, password, phone, address, image } = createUserDto;

    //check email
    const emailExists = await this.isEmailExist(email);
    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    //hash password
    const hashPassword: string = await hashPasswordHelper(password);

    //create new user
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
    });
    const savedUser = await this.userRepository.save(newUser);
    const { password: _, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async findAll(
    page?: number,
    limit?: number,
    sortBy?: keyof User,
  ): Promise<PaginationResult<Partial<User>>> {
    return paginate(this.userRepository, page, limit, undefined, sortBy);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    const updatedUser = Object.assign(user, updateUserDto);
    return this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<CustomApiResponse<{ message: string }>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    await this.userRepository.remove(user);
    return this.baseService.createSuccessResponse(
      `User with ID #${id} has been successfully removed.`,
    );
  }

  async findByEmailWithPassword(email: string): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;

    //check email
    const emailExists = await this.isEmailExist(email);
    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    //hash password
    const hashPassword: string = await hashPasswordHelper(password);

    //create new user
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashPassword,
      isActive: false,
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'day'),
    });
    const savedUser = await this.userRepository.save(newUser);
    const { password: _, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;

    //send email verification
  }
}
