import { DTO_uChangePassword } from "../validations/v_changePass";

interface ApiResponse<T> {
  status: boolean;
  data: T;
}
export type UserApiResponse = ApiResponse<string | Record<string, any>>;

export interface PropChangePassword {
  change: DTO_uChangePassword;
  idUser: string;
}
