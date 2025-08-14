import { createAPIFileRoute } from "@tanstack/react-start/api";
import { env } from "@/env";

export const Route = createAPIFileRoute("/api/spotify/callback")({
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
      const errorUrl = new URL("/", url.origin);
      errorUrl.searchParams.set("error", "Spotify Authorization Error");
      errorUrl.searchParams.set("error_details", error);
      return new Response(null, {
        status: 302,
        headers: {
          Location: errorUrl.toString(),
        },
      });
    }

    if (!code) {
      const errorUrl = new URL("/", url.origin);
      errorUrl.searchParams.set("error", "Authorization code not found.");
      return new Response(null, {
        status: 302,
        headers: {
          Location: errorUrl.toString(),
        },
      });
    }

    const basic = Buffer.from(
      `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
    ).toString("base64");
    const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: url.origin + "/api/spotify/callback",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      const errorUrl = new URL("/", url.origin);
      errorUrl.searchParams.set(
        "error",
        `Failed to exchange token: ${response.statusText}`,
      );
      errorUrl.searchParams.set("error_details", text);
      return new Response(null, {
        status: 302,
        headers: {
          Location: errorUrl.toString(),
        },
      });
    }

    const data = (await response.json()) as { refresh_token?: string };
    const refreshToken = data.refresh_token;

    if (!refreshToken) {
      const errorUrl = new URL("/", url.origin);
      errorUrl.searchParams.set(
        "error",
        "Refresh token not found in Spotify API response.",
      );
      errorUrl.searchParams.set("error_details", JSON.stringify(data, null, 2));
      return new Response(null, {
        status: 302,
        headers: {
          Location: errorUrl.toString(),
        },
      });
    }

    const successUrl = new URL("/", url.origin);
    const headers = new Headers();
    headers.append("Location", successUrl.toString());
    headers.append(
      "Set-Cookie",
      `spotify_refresh_token=${refreshToken}; HttpOnly; Path=/; SameSite=Lax; Secure`,
    );

    return new Response(null, {
      status: 302,
      headers,
    });
  },
});
