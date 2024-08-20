import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupStudentDto } from './dto/signup.student.dto';
import { SigninStudentDto } from './dto/signin.student.dto';
import { MailService } from '../helper/mail.service';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { OtpService } from 'src/helper/otp.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly mail: MailService,
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly otp: OtpService
  ) { }

  async signupStudent(signupStudentDto: SignupStudentDto) {
    try {
      const { email } = signupStudentDto;
      const user = await this.prisma.student.findFirst({ where: { email: email } });

      if (user) {
        return { message: "Admin already exists", status: HttpStatus.BAD_REQUEST }
      }

      signupStudentDto.password = await this.hash.hashPassword(signupStudentDto.password);

      const newUser = await this.prisma.student.create({
        data: signupStudentDto
      });

      const number = this.otp.generateOtp(6)
      const otp = await this.prisma.otps.create({
        data: { email: email, otp: number }
      });

      this.mail.sendMail(email, 'Otp', number)

      delete newUser.password;
      return {
        sendOtp: true,
        newStudent: newUser
      }

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findAll() {
    try {

      return await this.prisma.student.findMany();

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: SigninStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
