export function ChatTypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-50 px-4 py-3 shadow-sm">
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
    </div>
  );
}