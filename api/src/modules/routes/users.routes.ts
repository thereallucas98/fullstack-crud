import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UserController';

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
  usersController.create,
);

// List all deleted users
usersRouter.get('/', usersController.show);

export default usersRouter;
