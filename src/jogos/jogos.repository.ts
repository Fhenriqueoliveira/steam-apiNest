import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Jogo } from './jogos.entity';
import { CreateJogoDto } from './dtos/create-jogo.dto';
import { UserRole } from 'src/users/user-roles.enum';

@EntityRepository(Jogo)
export class JogoRepository extends Repository<Jogo> {
  async createJogo(
    createJogoDto: CreateJogoDto,
    role: UserRole,
  ): Promise<Jogo> {
    const { title, image_url, description } = createJogoDto;
    const jogo = this.create();
    jogo.title = title;
    jogo.image_url = image_url;
    jogo.description = description;

    try {
      await jogo.save();
      return jogo;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Jogo já cadastrado!');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o jogo no banco de dados',
        );
      }
    }
  }
}
