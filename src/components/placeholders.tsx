export function PlaceholderImage({
  width = 400,
  height = 300,
  text,
  className = "",
}: {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 ${className}`}
      style={{ width, height }}
    >
      {text && (
        <span className="text-sm text-muted-foreground font-medium">{text}</span>
      )}
    </div>
  );
}

export function CourseThumbnail({
  category,
  className = "",
}: {
  category: string;
  className?: string;
}) {
  const gradients: Record<string, string> = {
    Development: "from-emerald-500/20 to-emerald-600/10",
    Design: "from-violet-500/20 to-violet-600/10",
    "AI Tools": "from-amber-500/20 to-amber-600/10",
    Data: "from-blue-500/20 to-blue-600/10",
    Marketing: "from-pink-500/20 to-pink-600/10",
  };

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradients[category] || gradients.Development} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
  );
}
