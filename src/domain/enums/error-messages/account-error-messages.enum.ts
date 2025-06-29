export enum AccountErrorMessagesEnum {
  ACCOUNT_NOT_FOUND = '404,4041,Account not found',
  EMAIL_ALREADY_EXIST = '403,4031,Email already exist',
  OLD_PASS_WRONG = '400,4001,Old Password Wrong',
  NEW_PASS = '400,4002,New Password Must Be Same',
  SAME_NEW_PASS = '400,4003,Old Password Can Not Be Same As New Password',
  SAME_REGISTRATION = '400,4004,Account Registration Status Same.',
  EMAIL_PASS_WRONG = '400,4005,Email Or Password Wrong!',
  TOKEN_NOT_FOUND = '401,4011,Token Not found',
  CODE_NOT_FOUND = '404,4042,Code Not Found!',
  PASS_NOT_MATCH = '400,4006,Password Is Not Match',
  REGISTERED_STATUS = '403,4034,Account registration not completed',
}
