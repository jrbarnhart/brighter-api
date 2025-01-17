import { Controller } from '@nestjs/common';
import { CrudService } from './crud.service';

@Controller()
export class CrudController {
  constructor(private readonly crudService: CrudService) {}
}
