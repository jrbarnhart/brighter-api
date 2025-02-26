import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RegionsModule } from './regions/regions.module';
import { RoomsModule } from './rooms/rooms.module';
import { SkillsModule } from './skills/skills.module';
import { MonstersModule } from './monsters/monsters.module';
import { ItemsModule } from './items/items.module';
import { NpcsModule } from './npcs/npcs.module';
import { QuestsModule } from './quests/quests.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { EnumsModule } from './enums/enums.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RegionsModule,
    RoomsModule,
    SkillsModule,
    ItemsModule,
    MonstersModule,
    NpcsModule,
    QuestsModule,
    StatsModule,
    EnumsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    Logger,
  ],
})
export class AppModule {}
