export interface ErrorResponse {
  status: number;
  message: string;
  data?: any;
}

export const formatReply = (
  status: number,
  message: string,
  data?: any
): ErrorResponse => {
  return {
    status: status,
    message: message,
    data: data,
  };
};
