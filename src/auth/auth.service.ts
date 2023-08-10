import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        // PostされたCteateUserDtoを展開
        const { username, password, email } = createUserDto;

        // パスワードをハッシュ化
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // ユーザーを作成
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            email,
        });

        // ユーザーを保存
        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        // 成功したらユーザーを返す
        return user;
    }
}
