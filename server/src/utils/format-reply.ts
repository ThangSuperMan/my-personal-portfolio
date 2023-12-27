import { ErrorReply } from '../types';

export const formatReply = (
  status: number,
  message: string,
  data?: any
): ErrorReply => {
  return {
    status: status,
    message: message,
    data: data
  };
};
