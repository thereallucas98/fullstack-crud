import { Router } from 'express';

import usersRouter from '@modules/routes/users.routes';

const routes = Router();

// Users
routes.use('/users', usersRouter);

export default routes;
