import { authorize, route } from 'plumier';

export class HomeController {
  @authorize.public()
  @route.get('/')
  index() {
    return { hello: 'world' };
  }
}
