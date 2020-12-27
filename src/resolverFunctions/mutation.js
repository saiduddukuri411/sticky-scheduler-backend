import { getHashedPassword, comparePasswords } from "../utils/bcrypt";
import { signUpPrecheck, logInPrecheck } from "./prechecks";
import { getToken } from "../utils/jwtToken";
import getUserId from "../utils/getUser";

const secretKey = "stickySchedulerSecretKeyForJWT";
const mutation = {
  signUp: async (parent, { data }, { prisma }, info) => {
    if (await prisma.exists.User({ email })) {
      throw new Error("email exists");
    }
    const { name, email, password } = data;
    signUpPrecheck(name, email, password);
    const hashedPassword = await getHashedPassword(password);
    const finalInputData = { data: { ...data, password: hashedPassword } };
    const user = await prisma.mutation.createUser(finalInputData);
    const token = getToken({ userId: user.id }, secretKey);
    return {
      user,
      token,
    };
  },
  logIn: async (parent, { data }, { prisma }, info) => {
    const { email, password } = data;
    logInPrecheck(email, password);
    if (!(await prisma.exists.User({ email }))) {
      throw new Error("email doesnt exist");
    }
    const user = await prisma.query.user({ where: { email } });
    if (!(await comparePasswords(password, user.password))) {
      throw new Error("wrong password");
    }
    const token = getToken({ userId: user.id }, secretKey);
    return { user, token };
  },
  createSchedule: async (parent, { data }, { prisma, request }, info) => {
    const { title, date, priority } = data;
    const currDate = new Date(date);
    const id = getUserId(request, secretKey);
    return prisma.mutation.createSchedule(
      { data: { ...data, date: currDate, user: { connect: { id } } } },
      info
    );
  },
};
export default mutation;
