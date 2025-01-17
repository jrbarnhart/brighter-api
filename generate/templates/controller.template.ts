export const controllerTemplate = `
@Controller('__PLURAL__')
export class __PASCAL_PLURAL__Controller {
  constructor(private readonly __CAMEL_PLURAL__Service: __PASCAL_PLURAL__Service) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(create__PASCAL__Schema))
  create(@Body() create__PASCAL__Dto: Create__PASCAL__Dto) {
    return this.__CAMEL_PLURAL__Service.create(create__PASCAL__Dto);
  }

  @Get()
  findAll() {
    return this.__CAMEL_PLURAL__Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.__CAMEL_PLURAL__Service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(update__PASCAL__Schema)) update__PASCAL__Dto: Update__PASCAL__Dto,
  ) {
    return this.__CAMEL_PLURAL__Service.update(id, update__PASCAL__Dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.__CAMEL_PLURAL__Service.remove(id);
  }
}`;
