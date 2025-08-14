import { env } from "./env";

const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

type AccessToken = {
  access_token: string;
};

export const getAccessToken = async (refreshToken: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  return response.json() as Promise<AccessToken>;
};

export type CurrentlyPlaying = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

type Image = {
  url: string;
};

type SpotifyApi = {
  is_playing: boolean;
  item: {
    name: string;
    artists: Array<{
      name: string;
    }>;
    album: {
      name: string;
      images: Array<Image>;
    };
    external_urls: {
      spotify: string;
    };
  } | null;
};

export const getNowPlaying = async (
  request: Request,
): Promise<CurrentlyPlaying | null> => {
  const cookie = request.headers.get("Cookie");
  const refreshToken = cookie
    ?.split(";")
    .find((s) => s.trim().startsWith("spotify_refresh_token="))
    ?.split("=")[1];

  if (!refreshToken) {
    return null;
  }
  const { access_token } = await getAccessToken(refreshToken);

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  try {
    const song = (await response.json()) as SpotifyApi;

    if (song.item === null) {
      return null;
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    };
  } catch (error) {
    return null;
  }
};
