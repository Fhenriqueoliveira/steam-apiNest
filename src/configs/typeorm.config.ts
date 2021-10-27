import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'senha',
  database: 'steam',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
