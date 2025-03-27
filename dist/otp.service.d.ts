export declare class OtpService {
    generateOTP(userId: string): string;
    verifyOTP(userId: string, enteredOtp: string): string;
    private readOTPData;
    private writeOTPData;
}
