import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from 'src/helper/prisma.service';
import { OtpService } from 'src/helper/otp.service';
import { MailService } from 'src/helper/mail.service';
import { HashService } from 'src/helper/hash.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService, OtpService, MailService, HashService ],
})
export class StudentModule {}
