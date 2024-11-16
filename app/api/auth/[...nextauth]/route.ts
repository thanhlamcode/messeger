import bcrypt from "bcrypt";
// bcrypt: Thư viện mã hóa và so sánh mật khẩu.

import NextAuth, { AuthOptions } from "next-auth";
// NextAuth: Thư viện chính để triển khai hệ thống xác thực trong Next.js.

import CredentialsProvider from "next-auth/providers/credentials";
// CredentialsProvider: Provider cho phép bạn tự tạo hệ thống xác thực bằng email và mật khẩu.

import GithubProvider from "next-auth/providers/github";
// GithubProvider: Provider hỗ trợ đăng nhập thông qua GitHub.

import GoogleProvider from "next-auth/providers/google";
// GoogleProvider: Provider hỗ trợ đăng nhập thông qua Google.

import { PrismaAdapter } from "@next-auth/prisma-adapter";
// PrismaAdapter: Kết nối NextAuth với cơ sở dữ liệu thông qua Prisma.

import prisma from "@/app/libs/prismadb";
// prisma: Thể hiện của Prisma Client, dùng để tương tác với cơ sở dữ liệu.

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma), // Sử dụng Prisma Adapter để lưu dữ liệu người dùng trong cơ sở dữ liệu.
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string, // ID ứng dụng GitHub, lấy từ biến môi trường.
      clientSecret: process.env.GITHUB_SECRET as string, // Secret ứng dụng GitHub, lấy từ biến môi trường.
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, // ID ứng dụng Google, lấy từ biến môi trường.
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // Secret ứng dụng Google, lấy từ biến môi trường.
    }),
    CredentialsProvider({
      name: "credentials", // Tên của provider hiển thị trên giao diện đăng nhập.
      credentials: {
        email: { label: "email", type: "text" }, // Cấu hình trường nhập email.
        password: { label: "password", type: "password" }, // Cấu hình trường nhập mật khẩu.
      },
      async authorize(credentials) {
        // Kiểm tra xem email và mật khẩu có được cung cấp không.
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials"); // Ném lỗi nếu thiếu thông tin đăng nhập.
        }

        // Tìm người dùng trong cơ sở dữ liệu dựa trên email.
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Nếu không tìm thấy người dùng hoặc mật khẩu đã mã hóa không tồn tại, ném lỗi.
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // So sánh mật khẩu được cung cấp với mật khẩu đã mã hóa trong cơ sở dữ liệu.
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // Nếu mật khẩu không đúng, ném lỗi.
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // Nếu xác thực thành công, trả về thông tin người dùng.
        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development", // Bật chế độ debug khi chạy trong môi trường phát triển.
  session: {
    strategy: "jwt", // Sử dụng JSON Web Token (JWT) để quản lý phiên làm việc.
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret dùng để mã hóa JWT.
};

const handler = NextAuth(authOptions);
// Khởi tạo handler cho NextAuth với cấu hình xác thực đã định nghĩa.

export { handler as GET, handler as POST };
// Xuất handler cho các phương thức HTTP GET và POST, hỗ trợ API route "/api/auth/[...nextauth]".
