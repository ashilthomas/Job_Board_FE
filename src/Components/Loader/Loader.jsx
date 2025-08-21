export default function Loader() {
  return (
      <div className="flex items-center justify-center space-x-2 h-screen items-center" role="status" aria-label="Loading">
      <div className="h-3 w-3 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
      <div className="h-3 w-3 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
      <div className="h-3 w-3 rounded-full bg-gray-400 animate-bounce" />
    </div>
  );
}