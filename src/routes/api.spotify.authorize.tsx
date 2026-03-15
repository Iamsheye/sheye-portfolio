import { createFileRoute } from "@tanstack/react-router";
import { env } from "@/env";

const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
].join(" ");

export const Route = createFileRoute("/api/spotify/authorize")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const url = new URL(request.url);
        const redirectUri = `${url.origin}/api/spotify/callback`;

        const params = new URLSearchParams({
          response_type: "code",
          client_id: env.SPOTIFY_CLIENT_ID,
          scope: SCOPES,
          redirect_uri: redirectUri,
        });

        return new Response(null, {
          status: 302,
          headers: {
            Location: `https://accounts.spotify.com/authorize?${params}`,
          },
        });
      },
    },
  },
});
