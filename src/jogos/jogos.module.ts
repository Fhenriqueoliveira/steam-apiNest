import { Module } from '@nestjs/common';
import { JogosController } from './jogos.controller';
import { JogosService } from './jogos.service';
import { JogoRepository } from './jogos.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([JogoRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [JogosController],
  providers: [JogosService],
})
export class JogosModule {}
