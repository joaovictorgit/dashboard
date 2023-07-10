import { prisma } from "../service/prisma";

export async function checkIfUserExist(user_id: number): Promise<Boolean> {
  const user = await prisma.user.findUnique({
    where: {
      user_id: user_id,
    },
  });
  if (!user) {
    return false;
  }
  return true;
}
