import { createApp } from './shared/http/create-app';

const app = createApp();
app.listen(3000, () => {
  console.log('Server runing');
});
