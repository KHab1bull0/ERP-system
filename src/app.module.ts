import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    StudentModule,
    AdminModule,
    TeacherModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
