import { Repository, SelectQueryBuilder } from 'typeorm';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export async function paginate<T>(
  repositoryOrQueryBuilder: Repository<T> | SelectQueryBuilder<T>,
  page: number | string,
  limit: number | string,
  selectFields?: (keyof T)[],
  sortBy?: keyof T,
  order: 'ASC' | 'DESC' = 'ASC',
): Promise<PaginationResult<T>> {
  const currentPage = page !== undefined && page !== '' ? Number(page) : 1;
  const currentLimit =
    limit !== undefined && limit !== ''
      ? Math.min(Math.max(Number(limit), 10), 100)
      : 10;

  const skip = (currentPage - 1) * currentLimit;

  let queryBuilder: SelectQueryBuilder<T>;

  if (repositoryOrQueryBuilder instanceof Repository) {
    queryBuilder = repositoryOrQueryBuilder.createQueryBuilder('entity');
  } else {
    queryBuilder = repositoryOrQueryBuilder;
  }

  if (selectFields) {
    queryBuilder.select(selectFields.map((field) => `entity.${String(field)}`));
  }

  if (sortBy) {
    queryBuilder.orderBy(`entity.${String(sortBy)}`, order);
  }

  const [data, total] = await queryBuilder
    .skip(skip)
    .take(currentLimit)
    .getManyAndCount();

  return {
    data,
    total,
    page: currentPage,
    limit: currentLimit,
  };
}
