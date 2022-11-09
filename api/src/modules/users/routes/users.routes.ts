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
export default usersRouter;
