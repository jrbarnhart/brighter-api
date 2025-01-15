import { PartialType } from '@nestjs/mapped-types';
import { CreateNpcDto } from './create-npc.dto';

export class UpdateNpcDto extends PartialType(CreateNpcDto) {}
