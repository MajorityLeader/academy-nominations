import { Application } from '../declarations';
import applications from './applications/applications.service';
import emails from './emails/emails.service';
import recommendations from './recommendations/recommendations.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(applications);
  app.configure(emails);
  app.configure(recommendations);
}
