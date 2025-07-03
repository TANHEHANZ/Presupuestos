// src/infraestructure/prisma/extensions/paginate.ts
interface PaginateOptions {
  page?: number;
  limit?: number;
  where?: any;
  orderBy?: any;
  include?: any;
  select?: any;
}
export async function paginate<T>(
  model: any,
  options: PaginateOptions
): Promise<{
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}> {
  const page = Number(options.page ?? 1);
  const limit = Number(options.limit ?? 10);
  const skip = (page - 1) * limit;

  const [totalItems, data] = await Promise.all([
    model.count({ where: options.where }),
    model.findMany({
      skip,
      take: limit,
      where: options.where,
      orderBy: options.orderBy,
      include: options.include,
      select: options.select,
    }),
  ]);

  return {
    data,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
  };
}
