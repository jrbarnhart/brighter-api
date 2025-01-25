import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class JwtEntity {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  access_token: string;
}
