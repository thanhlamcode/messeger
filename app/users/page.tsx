"use client"; // Chỉ định rằng component này là Client Component, cần thiết để sử dụng các tính năng client-side như event handlers.

import EmptyState from "../components/EmptyState";

const Users = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default Users;
