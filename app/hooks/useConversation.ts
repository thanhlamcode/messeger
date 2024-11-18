import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  // Memoized value for conversationId
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return ""; // Trả về chuỗi rỗng nếu không có conversationId
    }
    return params.conversationId as string; // Ép kiểu để đảm bảo giá trị là string
  }, [params?.conversationId]); // Chỉ re-compute khi params.conversationId thay đổi

  // Memoized value for checking if a conversation is open
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return { conversationId, isOpen };
};

export default useConversation;
