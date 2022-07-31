import express from 'express';
import {
  GetUsers,
  Login,
  Profile,
  Register,
} from '../controllers/users.controller';
import { Auth } from '../middlewares/users.middleware';
const router = express.Router();

router.post('/signup', Register);
router.post('/login', Login);
router.get('/profile', Auth, Profile);

router.get('/users', GetUsers);

const UserRouter = router;
export default UserRouter;
