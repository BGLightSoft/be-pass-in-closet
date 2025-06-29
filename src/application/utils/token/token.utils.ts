export class TokenUtils {
  public static ExtractBearerToken(
    authorizationHeader?: string,
  ): string | null {
    if (!authorizationHeader || typeof authorizationHeader !== 'string')
      return null;

    const parts = authorizationHeader.trim().split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

    return parts[1];
  }
}
