

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';



    
const filePath = path.join(__dirname,'./Utils/otp.json');


@Injectable()
export class OtpService {
    
    generateOTP(userId: string): string {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
        const otpData = this.readOTPData();

        otpData.push({ userId, otp, generatedAt: Date.now() });
        this.writeOTPData(otpData);

        console.log("New OTP generated and stored:", otp);
        return otp;
    }

    verifyOTP(userId: string, enteredOtp: string): string {
        const otpData = this.readOTPData();
        console.log("Current OTP Data:", otpData);

        const userOtpEntry = otpData.find(entry => entry.userId === userId);

        if (!userOtpEntry) {
            return 'OTP not found!';
        }

        const currentTime = Date.now();
        const otpAge = (currentTime - userOtpEntry.generatedAt) / 60000; 
        if (otpAge > 10) {
            return 'OTP expired!';
        }

        return userOtpEntry.otp === enteredOtp ? 'OTP is correct!' : 'OTP is incorrect!';
    }

   
    private readOTPData(): any[] {
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true }); 
            }

            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
            }

            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data) || [];
        } catch (error) {
            console.error("Error reading OTP data:", error);
            return [];
        }
    }


    private writeOTPData(data: any[]): void {
        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
            console.log("OTP data successfully written to file.");
        } catch (error) {
            console.error("Error writing OTP data:", error);
        }
    }
}
