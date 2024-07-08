import { app } from './app';
import config from './config';

const port = config.PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
