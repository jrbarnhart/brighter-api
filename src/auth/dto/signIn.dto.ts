// import { z } from 'zod';

import { IsNotEmpty, IsString } from 'class-validator';

// export const signInSchema = z.object({
//   username: z.string(),
//   password: z.string(),
// });

// export type SignInDto = z.infer<typeof signInSchema>;
export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
