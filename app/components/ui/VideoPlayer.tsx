import React from "react";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
}

export function VideoPlayer({ url, thumbnail }: Readonly<VideoPlayerProps>) {
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  const getEmbedUrl = () => {
    if (isYouTube) {
      const id = url.split("v=")[1] || url.split("/").pop();
      return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
    }
    if (isVimeo) {
      const id = url.split("/").pop();
      return `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video Player"
        />
      ) : (
        <video
          src={url}
          className="w-full h-full object-cover"
          controls
          poster={thumbnail}
        >
          <track kind="captions" src="" label="English" default />
        </video>
      )}
    </div>
  );
}
