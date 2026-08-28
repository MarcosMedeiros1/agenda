import type { Permission, User } from "@agenda/shared/model";

export interface Session {
  currentUser(): User | null;
  authenticated(): boolean;
  hasPermission(p: Permission): boolean;
}
