import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '55416354',
  database: 'steam',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
