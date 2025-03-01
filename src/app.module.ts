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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { EnumsModule } from './enums/enums.module';
import { StatsModule } from './stats/stats.module';
import { HealthModule } from './health/health.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RequestLoggingInterceptor } from './interceptors/requestLogger.interceptor';

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
    HealthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 25,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: RequestLoggingInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
