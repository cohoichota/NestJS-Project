import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationResult } from 'src/helpers/pagination.util';
import { User } from 'src/modules/users/entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from 'src/interfaces/response.interface';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return list of users' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: keyof User,
  ): Promise<PaginationResult<Partial<User>>> {
    const currentPage = page && page > 0 ? page : 1; // Default to 1 if undefined or invalid
    const currentLimit = limit && limit > 0 ? Math.min(limit, 100) : 10; // Default to 10 if undefined or invalid
    return this.usersService.findAll(currentPage, currentLimit, sortBy);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return a single user' })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a new user' })
  @ApiResponse({ status: 201, description: 'User updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a new user' })
  @ApiResponse({ status: 201, description: 'User removed successfully' })
  async remove(
    @Param('id') id: string,
  ): Promise<CustomApiResponse<{ message: string }>> {
    return this.usersService.remove(+id);
  }
}
