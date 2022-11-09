import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();

const usersController = new UsersController();

// Create an user
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      birthday: Joi.string().required(),
    },
  }),
  isAuthenticated,
  usersController.create,
);

// List all deleted users
usersRouter.get('/', isAuthenticated, usersController.show);

usersRouter.get('/deleted-users', isAuthenticated, usersController.deletedOnes);

usersRouter.patch(
  '/soft-delete/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  usersController.softDelete,
);

usersRouter.patch(
  '/restore-user/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  usersController.restoreUser,
);

export default usersRouter;
