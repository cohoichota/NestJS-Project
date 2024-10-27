import { Injectable } from '@nestjs/common';
import { CustomApiResponse } from 'src/interfaces/response.interface';

@Injectable()
export class BaseService {
  createSuccessResponse<T>(message: string, data?: T): CustomApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  createErrorResponse(message: string): CustomApiResponse<null> {
    return {
      success: false,
      message,
    };
  }
}
