import { Router } from 'express';

import accountRouter from '@modules/users/routes/account.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

// Account
routes.use('/account', accountRouter);

// Users
routes.use('/users', usersRouter);

// Sessions
routes.use('/sessions', sessionsRouter);

export default routes;
