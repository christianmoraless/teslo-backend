import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser, RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Product was created', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbiden, Token related' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  privateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: User,
    @RawHeaders() rawHeader: string[],
  ) {
    return {
      ok: true,
      msg: 'private route',
      user,
      userEmail,
      rawHeader,
    };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUSer)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.superUSer)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
