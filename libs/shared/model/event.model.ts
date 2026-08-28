export interface Event {
  readonly id: string;
  readonly schedule: string;
  readonly notified: boolean;
}

export interface RecurringEvent {
  readonly events: Event[];
}
