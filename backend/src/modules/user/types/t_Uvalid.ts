interface ApiResponse<T> {
  status: boolean;
  data: T;
}
export type UserApiResponse = ApiResponse<string | Record<string, any>>;
