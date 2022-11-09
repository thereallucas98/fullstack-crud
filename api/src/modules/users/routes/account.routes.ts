import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AccountController from '../controllers/AccountController';

const accountRouter = Router();

const accountController = new AccountController();

// Create an user
accountRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      birthday: Joi.string().required(),
    },
  }),
  accountController.create,
);

export default accountRouter;
