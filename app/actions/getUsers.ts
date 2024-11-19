import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Đường dẫn tới cấu hình NextAuth
import prisma from "@/app/libs/prismadb";

const getUsers = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getUsers;
