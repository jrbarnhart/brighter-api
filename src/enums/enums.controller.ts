import { Controller } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  AttackElementsEnum,
  BankTypesEnum,
  FactionsEnum,
  GearSlotsEnum,
} from './entities/enums.entity';

@ApiExtraModels(AttackElementsEnum, FactionsEnum, GearSlotsEnum, BankTypesEnum)
@ApiTags('enums')
@Controller('enums')
export class EnumsController {}
