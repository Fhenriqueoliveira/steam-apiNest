import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ValidationPipe,
  UseGuards,
  Patch,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { UpdateDto } from './dtos/update-users.dto';
import { User } from './user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }
  @Get(':id')
  @Role(UserRole.ADMIN)
  async findUserById(@Param('íd') id: string): Promise<ReturnUserDto> {
    const user = await this.userService.findUserById(id);
    return {
      user,
      message: 'Usuario encontrado',
    };
  }
  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateDto: UpdateDto,
    @GetUser() user: User,
    @Param('íd') id: string,
  ) {
    if (user.role != UserRole.ADMIN && user.id.toString() != id) {
      throw new ForbiddenException(
        'Voce nao tem autorizacao para acessar esse recurso',
      );
    } else {
      return this.userService.updateUser(updateDto, id);
    }
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('íd') id: string) {
    await this.userService.deleteUser(id);
    return { message: 'Usuario Deletado com sucesso' };
  }

  @Get()
  @Role(UserRole.ADMIN)
  async findUsers(@Query() query: FindUsersQueryDto) {
    const found = await this.userService.findUsers(query);

    return {
      found,
      message: 'Usuarios encontrados',
    };
  }
}
