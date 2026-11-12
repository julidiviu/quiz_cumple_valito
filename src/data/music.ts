export type MusicTrack = {
  title: string;
  /** Ruta pública del MP3 (los archivos viven en public/music/). */
  src: string;
};

export const musicTracks: MusicTrack[] = [
  { title: "Sonatine", src: "/music/01-Sonatine-8bit.mp3" },
  { title: "Hi High", src: "/music/02-hi-high-8bit.mp3" },
  { title: "Flip That", src: "/music/03-Flip That-8bit.mp3" },
];
