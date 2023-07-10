import { prisma } from "../service/prisma";

export async function checkIfAdminExist(admin_id: number): Promise<Boolean> {
  const admin = await prisma.admin.findUnique({
    where: {
      admin_id,
    },
  });
  if (!admin) {
    return false;
  }
  return true;
}
