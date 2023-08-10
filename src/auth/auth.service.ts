import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private JwtService: JwtService,
    ) { }

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

    async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = credentialsDto; // credentialsDtoを展開
        const user = await this.userRepository.findOneBy({ username }); // usernameからユーザーを取得

        // パスワードの比較
        // bcryptにより、平文のパスワードとハッシュ値を比較することができる
        if (user && (await bcrypt.compare(password, user.password))) {  
            // JWTを生成
            const payload = { id: user.id, username: user.username };
            const accessToken = await this.JwtService.sign(payload); // 署名されたtoken
            return { accessToken };
        }
        // ユーザーが見つからない場合はエラーを返す
        throw new UnauthorizedException(
            'ユーザー名やパスワードを確認してください'
        );
    }
}
