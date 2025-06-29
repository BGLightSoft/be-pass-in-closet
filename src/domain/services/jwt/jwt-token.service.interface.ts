export interface IJwtTokenService {
  generateAccessToken(payload: any): string;
  generateRefreshToken(payload: any): string;
  verifyAccessToken<T = any>(token: string): T;
  verifyRefreshToken<T = any>(token: string): T;
  decodeToken<T = any>(token: string): T;
}
