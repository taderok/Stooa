

export interface Fishbowl {
  id?: string;
  name?: string;
  description?: string;
  startDateTime: Date;
  timezone: string;
  locale: string;
  duration: Date;
  isFishbowlNow?: boolean;
  hasIntroduction?: boolean;
  readonly slug?: string;
  readonly host?: string;
  readonly currentStatus?: string;
  readonly participants?: string[];
  readonly startDateTimeTz?: Date;
  readonly endDateTimeTz?: Date;
  readonly durationFormatted?: string;
}
