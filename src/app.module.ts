import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RegionsModule } from './regions/regions.module';
import { RoomsModule } from './rooms/rooms.module';
import { SkillsModule } from './skills/skills.module';
import { MonstersModule } from './monsters/monsters.module';
import { ResourcesModule } from './resources/resources.module';
import { ItemsModule } from './items/items.module';
import { NpcsModule } from './npcs/npcs.module';
import { QuestsModule } from './quests/quests.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RegionsModule,
    RoomsModule,
    SkillsModule,
    MonstersModule,
    ResourcesModule,
    ItemsModule,
    NpcsModule,
    QuestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
