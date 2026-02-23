import React from "react";

export default function VideoPlayer({ videoId }) {
  if (!videoId) return <p style={{ color: "#fff" }}>Vídeo não disponível.</p>;

  // 🔹 Extrai o ID do vídeo caso venha um link completo
  const extractYouTubeId = (url) => {
    if (!url) return null;

    // Se for apenas o ID, retorna direto
    if (url.length === 11 && !url.includes("http")) return url;

    // Extrai o ID de URLs padrão do YouTube
    const match = url.match(
      /(?:v=|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const validId = extractYouTubeId(videoId);
  const embedUrl = validId
    ? `https://www.youtube.com/embed/${validId}?autoplay=0&rel=0&modestbranding=1`
    : null;

  if (!embedUrl)
    return <p style={{ color: "#fff" }}>URL de vídeo inválida.</p>;

  return (
    <div className="ArrumarAA">
      <iframe
        className="ArrumarVideo"
        width="1100"
        height="500"
        src={embedUrl}
        title="Curso em vídeo"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
