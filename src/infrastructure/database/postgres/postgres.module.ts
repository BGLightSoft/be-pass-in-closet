// src/infrastructure/database/postgres/postgres.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  exports: [TypeOrmModule],
})
export class PostgresModule {}
