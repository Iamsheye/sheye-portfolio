import { env } from "./env";

export type CurrentlyPlaying = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type SpotifyCurrentlyPlayingResponse = {
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string; height: number; width: number }>;
    };
    external_urls: {
      spotify: string;
    };
  } | null;
  is_playing: boolean;
} | null;

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken(): Promise<string> {
  const client_id = env.SPOTIFY_CLIENT_ID;
  const client_secret = env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = env.SPOTIFY_REFRESH_TOKEN;

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get Spotify access token: ${response.statusText}`,
    );
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

export async function getCurrentlyPlaying(): Promise<CurrentlyPlaying | null> {
  try {
    const access_token = await getAccessToken();

    // TODO: Remove this log
    console.log("Access Token:", access_token);
    console.log("___________");

    const response = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // TODO: Remove this log
    console.log("response", response);
    console.log("___________");

    if (response.status === 204 || response.status > 400) {
      return null;
    }

    const song: SpotifyCurrentlyPlayingResponse = await response.json();

    if (!song?.item) {
      return null;
    }

    return {
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url || "",
      artist: song.item.artists.map((artist) => artist.name).join(", "),
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls.spotify,
      title: song.item.name,
    };
  } catch (error) {
    console.error("Error fetching currently playing song:", error);
    return null;
  }
}
