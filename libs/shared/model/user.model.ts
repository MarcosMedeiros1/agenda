export type Permission = "edit" | "create" | "manage";

export interface User {
  readonly id: string;
  readonly name: string;
  readonly permissions: readonly Permission[];
}
