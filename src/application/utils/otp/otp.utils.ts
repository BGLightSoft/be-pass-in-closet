export class OtpUtils {
  public static createOtpCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters.charAt(randomIndex);
    }

    return otp;
  }
}
