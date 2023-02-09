import { prisma } from '../prisma';

const getUserDataByEmail = async (email: string) => {
  try {
    const userData = await prisma.user.findFirst({ where: { e_mail: email } });
    return userData;
  } catch (e) {
    return null;
  }
};

const createUserDataByEmail = async (
  e_mail: string,
  address: string,
  public_key: string,
  private_key: string
) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        e_mail,
        public_key,
        private_key,
        address,
      },
    });
    return newUser;
  } catch (e) {
    return null;
  }
};

export { getUserDataByEmail, createUserDataByEmail };
