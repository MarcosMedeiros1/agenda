import type { Event } from "@agenda/shared/model";

export function calculateSchedules(): string[] {
  const event: Event = {
    id: "1",
    schedule: "2023-06-01T10:00:00Z",
    notified: false,
  };
  console.log(event.schedule);
  return [];
}
