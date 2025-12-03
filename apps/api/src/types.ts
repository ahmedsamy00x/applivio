import { Session, User } from "@applivio/auth";

export interface HonoEnv {
  Variables: {
    user: User | null;
    session: Session | null;
  };
}
