import { AuthError } from "next-auth";

export class CustomNextAuthError extends AuthError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
