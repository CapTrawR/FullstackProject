import jwt from "jsonwebtoken";
//estender as tipagens globais que o TS tem
declare global {
  namespace Express {
    interface Request {
      user?: string | jwt.JwtPayload;
    }
  }
}
