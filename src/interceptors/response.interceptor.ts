// This is no longer used. Left here for an example for future reference.

// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { map, Observable } from 'rxjs';

// @Injectable()
// export class ResponseInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<any>,
//   ): Observable<any> | Promise<Observable<any>> {
//     const request = context.switchToHttp().getRequest();

//     if (request.url === '/') {
//       return next.handle();
//     }

//     return next.handle().pipe(
//       map((data) => {
//         const statusCode = context.switchToHttp().getResponse().statusCode;
//         return {
//           status: statusCode,
//           success: true,
//           data,
//         };
//       }),
//     );
//   }
// }
