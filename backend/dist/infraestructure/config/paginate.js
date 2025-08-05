"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
async function paginate(model, options) {
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
