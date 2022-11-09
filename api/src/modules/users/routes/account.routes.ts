import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import AccountController from '../controllers/AccountController';
import ProfileController from '../controllers/ProfileController';

const accountRouter = Router();

const accountController = new AccountController();
const profileController = new ProfileController();

// Create account
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

accountRouter.patch(
  '/me',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  isAuthenticated,
  profileController.update,
);

accountRouter.patch(
  '/password',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      old_password: Joi.string().required(),
    },
  }),
  isAuthenticated,
  profileController.password,
);

accountRouter.get('/me', isAuthenticated, profileController.show);

export default accountRouter;
