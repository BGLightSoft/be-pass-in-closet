export interface IMapper<Entity, Model> {
  toDomain(entity: Entity): Model;
  toEntity(domain: Model): Entity;
}
