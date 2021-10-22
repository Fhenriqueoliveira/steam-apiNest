import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Delete,
  Param,
  Get,
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import { CreateJogoDto } from './dtos/create-jogo.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { JogosService } from './jogos.service';
import { UpdateJogoDto } from './dtos/update-jogos.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { ReturnJogoDto } from './dtos/return-jogo.dto';

@Controller('jogos')
@UseGuards(AuthGuard(), RolesGuard)
@Controller('jogos')
export class JogosController {
  constructor(private jogosService: JogosService) {}

  @Post()
  @Role(UserRole.ADMIN)
  async createJogo(
    @Body(ValidationPipe) createJogoDto: CreateJogoDto,
  ): Promise<ReturnJogoDto> {
    const jogo = await this.jogosService.createJogo(createJogoDto);
    return {
      jogo,
      message: 'Jogo cadastrado com sucesso',
    };
  }

  @Get()
  async findJogos() {
    return this.jogosService.findJogos();
  }

  @Get('/:id')
  @Role(UserRole.ADMIN)
  async findJogoById(@Param('id') id: string): Promise<ReturnJogoDto> {
    const jogo = await this.jogosService.findJogoById(id);
    return {
      jogo,
      message: 'Jogo encontrado',
    };
  }

  @Patch('/:id')
  async updateJogo(
    @Body(ValidationPipe) updateJogoDto: UpdateJogoDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN)
      throw new ForbiddenException('Você não tem autorização de acesso');
    else {
      return this.jogosService.updateJogo(updateJogoDto, id);
    }
  }

  @Delete('/:id')
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.jogosService.deleteJogo(id);
    return { message: 'Jogo excluído com sucesso' };
  }
}
