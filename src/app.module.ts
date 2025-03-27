import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';


@Module({
  imports: [],
  controllers: [OtpController],
  providers: [OtpService],
})
export class AppModule {}
