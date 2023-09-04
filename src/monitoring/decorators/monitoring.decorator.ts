import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * リクエストユーザーを取得するデコレータ
 * JWT認証を行っている場合、リクエストユーザーはrequest.userに格納される。
 */
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
