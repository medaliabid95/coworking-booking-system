export interface EmailEvent {
  to: string;
  subject: string;
  template: string;
  context: any;
}
