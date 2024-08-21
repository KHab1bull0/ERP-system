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
    return this.prisma.$transaction(async (prisma) => {
      try {
        const { email } = signupStudentDto;
        const user = await prisma.student.findFirst({ where: { email: email } });
        console.log(user);
        
        if (user) {
          return { message: "Student already exists", status: HttpStatus.BAD_REQUEST }
        }
        console.log(signupStudentDto);

        signupStudentDto.password = await this.hash.hashPassword(signupStudentDto.password);

        const newUser = await prisma.student.create({
          data: signupStudentDto
        });


        let checkotp = false

        // if (signupStudentDto.email) {
          // throw new Error('error ')
          const number = this.otp.generateOtp(6)
          await prisma.otps.create({
            data: { email: email, otp: number }
          });

          this.mail.sendMail(email, 'Otp', number)
          checkotp = true
        // }

        delete newUser.password;
        return {
          sendOtp: checkotp,
          newStudent: newUser
        }

      } catch (e) {
        console.log(e);
        throw { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
      }
    });
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
