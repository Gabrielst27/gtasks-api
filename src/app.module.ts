import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CollaboratorsModule } from './modules/collaborators/collaborators.module';

@Module({
  imports: [
    ProjectsModule,
    SharedModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    UsersModule,
    AuthModule,
    CollaboratorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
