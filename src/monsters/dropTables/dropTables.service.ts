import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateDropTableDto } from './dto/create-dropTable.dto';
import { UpdateDropTableDto } from './dto/update-dropTable.dto';
import { DropTable } from '@prisma/client';

@Injectable()
export class DropTablesService {
  constructor(private prisma: PrismaService) {}

  async create(createDropTableDto: CreateDropTableDto): Promise<DropTable> {
    try {
      return await this.prisma.dropTable.create({
        data: createDropTableDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<DropTable[]> {
    return this.prisma.dropTable.findMany({
      include: {
        // Add your includes here
      },
    });
  }

  async findOne(id: number): Promise<DropTable> {
    const foundDropTable = await this.prisma.dropTable.findUnique({
      where: { id },
      include: {
        // Add your includes here
      },
    });

    if (foundDropTable === null) {
      throw new NotFoundException();
    }

    return foundDropTable;
  }

  async update(
    id: number,
    updateDropTableDto: UpdateDropTableDto,
  ): Promise<DropTable> {
    const dropTableToUpdate = await this.prisma.dropTable.findUnique({
      where: { id },
    });

    if (!dropTableToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.dropTable.update({
        where: { id },
        data: updateDropTableDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<DropTable> {
    const dropTableToDelete = await this.prisma.dropTable.findUnique({
      where: { id },
    });

    if (!dropTableToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.dropTable.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
