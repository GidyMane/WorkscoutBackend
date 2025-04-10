import prisma from "../client";


export const createProfile = async (kindeId: string, profileData: any) => {
  const account = await prisma.account.findFirst({ where: { 

  } });
  if (!account) throw new Error("Account not found");

  const existing = await prisma.profile.findUnique({ where: { accountId: account.id } });
  if (existing) throw new Error("Profile already exists");

  const profile = await prisma.profile.create({
    data: {
      ...profileData,
      accountId: account.id,
    },
  });

  return profile;
};

export const getProfile = async (kindeId: string) => {
  const account = await prisma.account.findUnique({ where: { kindeId } });
  if (!account) throw new Error("Account not found");

  return prisma.profile.findUnique({
    where: { accountId: account.id },
  });
};
