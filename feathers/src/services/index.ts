import { Application } from '../declarations';
import applications from './applications/applications.service';
import emails from './emails/emails.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(applications);
  app.configure(emails);
}
