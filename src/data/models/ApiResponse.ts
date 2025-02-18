interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;