import assert from 'node:assert';
import AppError from './AppError';
import AppErrorCode from '../constants/appErrorCode';
import { HttpStatusCode } from '../constants/http';

/**
 * appAssert it's gonna throw an AppError if condition is falsy
 */

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition

const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;