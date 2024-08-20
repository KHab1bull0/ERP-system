import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [StudentModule, AdminModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
