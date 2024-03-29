import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Public } from "./auth.set-metadata";
import { LocalAuthGuard } from "./local-guard.auth";
import {Request, Response} from "express"


@Controller('api/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Public()
	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(@Req() req: Request) {
		return this.authService.login(req.user);
	}
}
