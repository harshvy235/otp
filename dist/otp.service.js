"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, '../otp.json');
let OtpService = class OtpService {
    generateOTP(userId) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpData = this.readOTPData();
        otpData.push({ userId, otp, generatedAt: Date.now() });
        this.writeOTPData(otpData);
        console.log("New OTP generated and stored:", otp);
        return otp;
    }
    verifyOTP(userId, enteredOtp) {
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
    readOTPData() {
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
            }
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data) || [];
        }
        catch (error) {
            console.error("Error reading OTP data:", error);
            return [];
        }
    }
    writeOTPData(data) {
        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
            console.log("OTP data successfully written to file.");
        }
        catch (error) {
            console.error("Error writing OTP data:", error);
        }
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)()
], OtpService);
//# sourceMappingURL=otp.service.js.map