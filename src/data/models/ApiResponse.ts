
/**
 * The success response from the API.
 */
interface SuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * The error response from the API.
 */
interface ErrorResponse {
  success: false;
  error: string;
}

/**
 * The response from the API.
 */
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;