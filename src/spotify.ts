import { env } from "./env";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played";

export type NowPlayingData = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
};

type SpotifyNowPlayingResponse = {
  is_playing: boolean;
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
  } | null;
};

type SpotifyRecentlyPlayedResponse = {
  items: Array<{
    track: {
      name: string;
      artists: Array<{ name: string }>;
      album: {
        name: string;
        images: Array<{ url: string }>;
      };
      external_urls: {
        spotify: string;
      };
    };
  }>;
};

const tokenStore = {
  accessToken: null as string | null,
  refreshToken: null as string | null,
  expiresAt: 0,
};

export function setTokens(accessToken: string, refreshToken: string, expiresIn: number) {
  tokenStore.accessToken = accessToken;
  tokenStore.refreshToken = refreshToken;
  tokenStore.expiresAt = Date.now() + expiresIn * 1000;
}

const SPOTIFY_REFRESH_COOKIE = "spotify_refresh_token";

function getRefreshTokenFromRequest(request: Request | null): string | null {
  if (!request) return null;
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie.match(new RegExp(`${SPOTIFY_REFRESH_COOKIE}=([^;]+)`));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1].trim());
  } catch {
    return null;
  }
}

export function isAuthorized(): boolean {
  return tokenStore.refreshToken !== null;
}

async function getAccessToken(request?: Request | null): Promise<string> {
  const refreshToken =
    tokenStore.refreshToken ?? getRefreshTokenFromRequest(request ?? null);

  if (!refreshToken) {
    throw new Error("Spotify not authorized. Visit /api/spotify/authorize to connect.");
  }

  if (tokenStore.accessToken && Date.now() < tokenStore.expiresAt - 60_000) {
    return tokenStore.accessToken;
  }

  const basic = Buffer.from(
    `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

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

  if (!response.ok) {
    throw new Error(`Failed to refresh Spotify token: ${response.statusText}`);
  }

  const data = (await response.json()) as SpotifyTokenResponse;

  tokenStore.accessToken = data.access_token;
  tokenStore.expiresAt = Date.now() + data.expires_in * 1000;
  if (data.refresh_token) {
    tokenStore.refreshToken = data.refresh_token;
  } else if (!tokenStore.refreshToken) {
    tokenStore.refreshToken = refreshToken;
  }

  return data.access_token;
}

async function getRecentlyPlayed(
  accessToken: string,
): Promise<NowPlayingData | null> {
  try {
    const response = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=1`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as SpotifyRecentlyPlayedResponse;
    const item = data.items.at(0);

    if (!item) return null;

    return {
      isPlaying: false,
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(", "),
      album: item.track.album.name,
      albumImageUrl: item.track.album.images[0]?.url ?? "",
      songUrl: item.track.external_urls.spotify,
    };
  } catch {
    return null;
  }
}

export async function getNowPlaying(
  request?: Request | null,
): Promise<NowPlayingData | null> {
  try {
    const accessToken = await getAccessToken(request);

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 204 || response.status >= 400) {
      return getRecentlyPlayed(accessToken);
    }

    const data = (await response.json()) as SpotifyNowPlayingResponse;

    if (!data.item) {
      return getRecentlyPlayed(accessToken);
    }

    return {
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a) => a.name).join(", "),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images[0]?.url ?? "",
      songUrl: data.item.external_urls.spotify,
    };
  } catch {
    return null;
  }
}
