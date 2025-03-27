import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Response } from 'express';


@Controller('/otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) {}

   
    @Get('/generate')
    generateOtp(@Query('userId') userId: string ,@Res() res : Response) {
        if (!userId) {
            return res.status(400).json( { message: ' userId is required!' });
        }
        const otp = this.otpService.generateOTP(userId);
        return res.status(201).json({ message: 'OTP generated successfully!', otp });
    }

    
    @Post('/verify')
    verifyOtp(@Query('userId') userId: string, @Query('otp') otp: string,@Res() res :Response) {
        if (!userId || !otp) {
            return res.status(400).json({ message: ' userId and otp are required!' });
        }
        return res.status(200).json({ message: this.otpService.verifyOTP(userId, otp) });
    }
}
