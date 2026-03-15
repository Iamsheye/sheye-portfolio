import { createFileRoute } from "@tanstack/react-router";
import { env } from "@/env";
import { setTokens } from "@/spotify";

export const Route = createFileRoute("/api/spotify/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const error = url.searchParams.get("error");

        if (error) {
          return Response.json(
            { error: "Spotify authorization denied", details: error },
            { status: 400 },
          );
        }

        if (!code) {
          return Response.json(
            { error: "Authorization code not found" },
            { status: 400 },
          );
        }

        const basic = Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
        ).toString("base64");

        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: `${url.origin}/api/spotify/callback`,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          return Response.json(
            { error: `Token exchange failed: ${response.statusText}`, details: text },
            { status: 502 },
          );
        }

        const data = (await response.json()) as {
          access_token: string;
          refresh_token?: string;
          expires_in: number;
        };

        if (!data.refresh_token) {
          return Response.json(
            { error: "No refresh token in Spotify response", details: data },
            { status: 502 },
          );
        }

        setTokens(data.access_token, data.refresh_token, data.expires_in);

        return new Response(null, {
          status: 302,
          headers: { Location: "/" },
        });
      },
    },
  },
});
