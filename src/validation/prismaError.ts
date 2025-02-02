import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export default function prismaError(error: unknown): BadRequestException {
  // Handle specific Prisma error for unique constraints
  if (error instanceof PrismaClientKnownRequestError) {
    return new BadRequestException('Validation failed', error.message);
  }

  // For any other error that we didn't explicitly handle
  console.log(error);
  return new BadRequestException('An unknown error occured');
}
