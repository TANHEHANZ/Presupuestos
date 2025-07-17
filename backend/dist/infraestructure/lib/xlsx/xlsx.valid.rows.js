"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRows = validateRows;
function validateRows(rows, schema) {
    const valid = [];
    const errors = [];
    rows.forEach((row, index) => {
        const result = schema.safeParse(row);
        if (result.success) {
            valid.push(result.data);
        }
        else {
            errors.push({ row: index + 2, error: result.error });
        }
    });
    return { valid, errors };
}
