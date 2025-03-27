import { OtpService } from './otp.service';
import { Response } from 'express';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    generateOtp(userId: string, res: Response): Response<any, Record<string, any>>;
    verifyOtp(userId: string, otp: string, res: Response): Response<any, Record<string, any>>;
}
