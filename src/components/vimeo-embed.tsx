export function VimeoEmbed({
  id,
  title,
  still,
  autoPlay = false,
}: {
  id: string;
  title: string;
  still?: string;
  autoPlay?: boolean;
}) {
  const params = new URLSearchParams({
    title: "0",
    byline: "0",
    portrait: "0",
    badge: "0",
    autopause: "0",
    dnt: "1",
    app_id: "122963",
  });
  if (autoPlay) params.set("autoplay", "1");

  return (
    <div className="relative aspect-video overflow-hidden bg-bg-elevated">
      {still ? (
        <img
          src={still}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      <iframe
        src={`https://player.vimeo.com/video/${id}?${params.toString()}`}
        title={title}
        className="absolute inset-0 size-full"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
