import { ChatMessage, ChatUserRole } from "./chat-types";
import { ChatProposalCard } from "./chat-proposal-card";
import { ProviderAvatar } from "../../app/cliente/components/ProviderAvatar";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  currentUserRole: ChatUserRole;
  providerName: string;
  clientName: string;
}

export function ChatMessageBubble({
  message,
  currentUserRole,
  providerName,
  clientName,
}: ChatMessageBubbleProps) {
  const isSystem = message.author === "system";
  const isCurrentUser = message.author === currentUserRole;

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="max-w-[80%] rounded-full bg-green-50 px-4 py-2 text-center text-[11px] font-black uppercase tracking-widest text-green-700">
          {message.text}
        </div>
      </div>
    );
  }

  const avatarName = message.author === "prestador" ? providerName : clientName;

  return (
    <div
      className={`flex items-end gap-3 ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isCurrentUser && (
        <ProviderAvatar name={avatarName} src={null} size="sm" />
      )}

      <div
        className={`max-w-[75%] rounded-[24px] px-5 py-4 shadow-sm ${
          isCurrentUser
            ? "rounded-br-md bg-yellow-50 text-gray-800"
            : "rounded-bl-md bg-gray-50 text-gray-700"
        }`}
      >
        {message.text && (
          <p className="text-sm font-medium leading-relaxed">{message.text}</p>
        )}

        {message.image && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-white bg-white">
            <img
              src={message.image}
              alt="Imagem enviada no chat"
              className="h-36 w-full object-cover"
            />
          </div>
        )}

        {message.proposal && <ChatProposalCard proposal={message.proposal} />}

        <div className="mt-2 flex justify-end">
          <span className="text-[10px] font-bold text-gray-400">
            {message.time}
          </span>
        </div>
      </div>

      {isCurrentUser && (
        <ProviderAvatar name={avatarName} src={null} size="sm" />
      )}
    </div>
  );
}