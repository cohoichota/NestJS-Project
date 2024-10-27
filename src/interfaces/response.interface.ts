export interface CustomApiResponse<T> {
  success: boolean;
  message: string;
  data?: T; // Optional, to hold the response data for successful requests
}
