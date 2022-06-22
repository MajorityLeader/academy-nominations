// Initializes the `recommendations` service on path `/recommendations`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Recommendations } from './recommendations.class';
import hooks from './recommendations.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'recommendations': Recommendations & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/recommendations', new Recommendations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('recommendations');

  service.hooks(hooks);
}
