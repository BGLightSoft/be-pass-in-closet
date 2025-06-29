// src/domain/repositories/base.repository.interface.ts
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
  ObjectLiteral,
  QueryRunner,
  EntityManager,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IBaseRepository<Entity extends ObjectLiteral, Model> {
  create(domain: DeepPartial<Model>): Promise<Model>;
  createMany(domains: DeepPartial<Model>[]): Model[];
  softDelete(
    criteria: FindOptionsWhere<Entity>,
    queryRunner?: any,
  ): Promise<UpdateResult>;
  save(
    domain: DeepPartial<Model>,
    options?: SaveOptions,
    queryRunner?: any,
  ): Promise<Model>;
  saveMany(
    domains: DeepPartial<Model>[],
    options?: SaveOptions,
    queryRunner?: any,
  ): Promise<Model[]>;
  insertMany(
    domains: DeepPartial<Model>[],
    queryRunner?: QueryRunner,
  ): Promise<void>;
  find(options?: FindManyOptions<Entity>): Promise<Model[]>;
  findBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Model[]>;
  findOne(
    options: FindOneOptions<Entity>,
    manager?: EntityManager,
  ): Promise<Model | null>;
  findOneBy(where: FindOptionsWhere<Entity>): Promise<Model | null>;

  findAndCount(options?: FindManyOptions<Entity>): Promise<[Model[], number]>;
  count(options?: FindManyOptions<Entity>): Promise<number>;
  countBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<number>;

  update(
    criteria: FindOptionsWhere<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
    queryRunner?: any,
  ): Promise<UpdateResult>;

  delete(criteria: FindOptionsWhere<Entity>): Promise<DeleteResult>;

  exists(where: FindOptionsWhere<Entity>): Promise<boolean>;
  query<T = any>(query: string, parameters?: any[]): Promise<T>;
  clear(): Promise<void>;
  createQueryBuilder(alias?: string): SelectQueryBuilder<Entity>;
}
