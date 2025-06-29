import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
  DataSource,
  EntityManager,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IBaseRepository } from 'src/domain/repositories/base.repository.interface';
import { IMapper } from 'src/domain/mapper/mapper.interface';
import { QueryRunner } from 'typeorm';

export abstract class BaseRepository<Entity extends ObjectLiteral, Model>
  implements IBaseRepository<Entity, Model>
{
  protected readonly repository: Repository<Entity>;

  constructor(
    protected readonly dataSource: DataSource,
    private readonly entityClass: new () => Entity,
    protected readonly mapper: IMapper<Entity, Model>,
  ) {
    this.repository = this.dataSource.getRepository(entityClass);
  }

  async create(domain: DeepPartial<Model>): Promise<Model> {
    const entity = this.mapper.toEntity(domain as Model);
    const savedEntity = await this.repository.save(entity);
    return this.mapper.toDomain(savedEntity);
  }

  createMany(domains: DeepPartial<Model>[]): Model[] {
    const entities = domains.map((d) =>
      this.mapper.toEntity(d as Model),
    ) as DeepPartial<Entity>[];
    const createdEntities = this.repository.create(entities);
    return createdEntities.map((e) => this.mapper.toDomain(e));
  }

  async save(
    domain: DeepPartial<Model>,
    options?: SaveOptions,
    queryRunner?: QueryRunner,
  ): Promise<Model> {
    const entity = this.mapper.toEntity(domain as Model);

    const manager = queryRunner ? queryRunner.manager : this.repository.manager;
    const saved = await manager.save(
      this.entityClass,
      entity as DeepPartial<Entity>,
      options,
    );
    return this.mapper.toDomain(saved);
  }

  async saveMany(
    domains: DeepPartial<Model>[],
    options?: SaveOptions,
    queryRunner?: QueryRunner,
  ): Promise<Model[]> {
    const entities = domains.map((d) =>
      this.mapper.toEntity(d as Model),
    ) as DeepPartial<Entity>[];

    const manager = queryRunner ? queryRunner.manager : this.repository.manager;
    const saved = await manager.save(this.entityClass, entities, options);
    return saved.map((e) => this.mapper.toDomain(e));
  }

  async find(options?: FindManyOptions<Entity>): Promise<Model[]> {
    const entities = await this.repository.find(options);
    return entities.map((e) => this.mapper.toDomain(e));
  }

  async findBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Model[]> {
    const entities = await this.repository.findBy(where);
    return entities.map((e) => this.mapper.toDomain(e));
  }

  async findOne(
    options: FindOneOptions<Entity>,
    manager?: EntityManager,
  ): Promise<Model | null> {
    const repo = manager
      ? manager.getRepository(this.entityClass)
      : this.repository;

    const entity = await repo.findOne(options);
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async findOneBy(where: FindOptionsWhere<Entity>): Promise<Model | null> {
    const entity = await this.repository.findOneBy(where);
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async insertMany(
    domains: DeepPartial<Model>[],
    queryRunner?: QueryRunner,
  ): Promise<void> {
    const entities = domains.map((d) =>
      this.mapper.toEntity(d as Model),
    ) as QueryDeepPartialEntity<Entity>[];

    const manager = queryRunner ? queryRunner.manager : this.repository.manager;
    await manager.getRepository(this.entityClass).insert(entities);
  }

  async findAndCount(
    options?: FindManyOptions<Entity>,
  ): Promise<[Model[], number]> {
    const [entities, count] = await this.repository.findAndCount(options);
    return [entities.map((e) => this.mapper.toDomain(e)), count];
  }

  async count(options?: FindManyOptions<Entity>): Promise<number> {
    return this.repository.count(options);
  }

  async countBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<number> {
    return this.repository.countBy(where);
  }

  async update(
    criteria: FindOptionsWhere<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
    queryRunner?: QueryRunner,
  ): Promise<UpdateResult> {
    const manager = queryRunner ? queryRunner.manager : this.repository.manager;
    return manager.update(this.entityClass, criteria, partialEntity);
  }
  async softDelete(
    criteria: FindOptionsWhere<Entity>,
    queryRunner?: QueryRunner,
  ): Promise<UpdateResult> {
    const manager = queryRunner ? queryRunner.manager : this.repository.manager;
    return manager.softDelete(this.entityClass, criteria);
  }
  async delete(criteria: FindOptionsWhere<Entity>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

  async exists(where: FindOptionsWhere<Entity>): Promise<boolean> {
    return this.repository.exist({ where });
  }

  async query<T = any>(query: string, parameters?: any[]): Promise<T> {
    return this.repository.query(query, parameters);
  }

  clear(): Promise<void> {
    return this.repository.clear();
  }

  createQueryBuilder(alias?: string): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(alias);
  }
}
