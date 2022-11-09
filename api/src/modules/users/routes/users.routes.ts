import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();

const usersController = new UsersController();

// List all deleted users
usersRouter.get('/', isAuthenticated, usersController.show);
export default usersRouter;
