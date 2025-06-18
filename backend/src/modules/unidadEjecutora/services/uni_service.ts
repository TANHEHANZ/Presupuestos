import { DTO_uniCreate } from "../validations/v_create";

export const Uni_service = {
  all: async (): Promise<void> => {},
  info: async (id: string): Promise<void> => {},
  update: async (id: string): Promise<void> => {},
  delete: async (id: string): Promise<void> => {},
  create: async (data: DTO_uniCreate): Promise<void> => {},
};
