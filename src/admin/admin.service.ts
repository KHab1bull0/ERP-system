import { Injectable } from '@nestjs/common';
import { SignupAdminDto } from './dto/admin.signup';



@Injectable()
export class AdminService {
  create(signupAdminDto: SignupAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: any) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
