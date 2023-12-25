export interface ErrorResponse {
  status: number;
  message: string;
}

export const formatErrorResponse = (
  status: number,
  message: string
): ErrorResponse => {
  return {
    status: status,
    message: message,
  };
};
