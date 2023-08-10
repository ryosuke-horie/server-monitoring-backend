import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.authService.signUp(createUserDto);
    }

    // @Post('/signin')
    // async signin(
    //     @Body() credentialsDto: CredentialsDto
    // ): Promise<{ accessToken: string }> {
    //     return await this.authService.signIn(credentialsDto);
    // }
}
