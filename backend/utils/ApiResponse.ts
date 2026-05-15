class ApiResonse {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;

  constructor(
    statusCode: number = 200,
    message: string = 'Success',
    data: any = null
  ) {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 300 ? true : false;
    this.message = message;
    this.data = data;
  }
}

export default ApiResonse;
