import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JogoRepository } from './jogos.repository';
import { UserRole } from '../users/user-roles.enum';
import { CreateJogoDto } from './dtos/create-jogo.dto';
import { Jogo } from './jogos.entity';
import { UpdateJogoDto } from './dtos/update-jogos.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JogosService {
  constructor(
    @InjectRepository(JogoRepository)
    private jogoRepository: JogoRepository,
  ) {}

  async createJogo(createJogoDto: CreateJogoDto): Promise<Jogo> {
    return this.jogoRepository.createJogo(createJogoDto, UserRole.ADMIN);
  }

  async findJogos(): Promise<Jogo[]> {
    return Jogo.find();
  }

  async findJogoById(jogoId: string): Promise<Jogo> {
    const jogo = await this.jogoRepository.findOne(jogoId, {
      select: ['title', 'description', 'id'],
    });

    if (!jogo) throw new NotFoundException('Jogo não encontrado');

    return jogo;
  }

  async updateJogo(updateJogoDto: UpdateJogoDto, id: string): Promise<Jogo> {
    const jogo = await this.findJogoById(id);
    const { title, image_url, description } = updateJogoDto;
    jogo.title = title ? title : jogo.title;
    jogo.image_url = image_url ? image_url : jogo.image_url;
    jogo.description = description ? description : jogo.description;
    try {
      await jogo.save();
      return jogo;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar os dados no banco de dados',
      );
    }
  }

  async deleteJogo(jogoId: string) {
    const result = await this.jogoRepository.delete({ id: jogoId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um jogo com o ID informado',
      );
    }
  }
}
