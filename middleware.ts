// Import withAuth từ next-auth/middleware để bảo vệ các route yêu cầu xác thực
import { withAuth } from "next-auth/middleware";

// Cấu hình middleware để bảo vệ các route
export default withAuth({
  // Chỉ định trang đăng nhập nếu người dùng chưa xác thực
  pages: {
    signIn: "/", // Nếu người dùng chưa đăng nhập, họ sẽ được chuyển hướng đến trang "/"
  },
});

// Cấu hình matcher để chỉ định các route mà middleware sẽ áp dụng
export const config = {
  matcher: [
    "/users/:path*", // Áp dụng middleware cho tất cả các route bắt đầu bằng "/users", bao gồm cả các sub-path như "/users/profile"
  ],
};
