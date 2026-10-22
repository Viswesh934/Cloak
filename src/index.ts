import type { Env } from "./types.ts";
import {
  handleCreateSecret,
  handleGetSecret,
  handleDeleteSecret,
  jsonResponse,
  errorResponse,
  corsHeaders,
} from "./api.ts";

import { HTML_TEMPLATE } from "./ui.ts";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    // Handle CORS preflight requests
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Health check endpoint
    if (url.pathname === "/api/health" || url.pathname === "/health") {
      return jsonResponse({
        status: "ok",
        service: "cloak",
        timestamp: Date.now(),
      });
    }

    // Match /api/secrets or /aps/secrets endpoints
    const secretPathRegex = /^\/(?:api|aps)\/secrets(?:\/([^\/]+))?\/?$/;
    const match = url.pathname.match(secretPathRegex);

    if (match) {
      const secretId = match[1]; // undefined for root /api/secrets

      if (method === "POST" && !secretId) {
        return handleCreateSecret(request, env);
      }

      if (method === "GET" && secretId) {
        return handleGetSecret(secretId, env);
      }

      if (method === "DELETE" && secretId) {
        return handleDeleteSecret(secretId, env);
      }

      return errorResponse(`Method ${method} not allowed for this route`, 405);
    }

    // Serve interactive Web UI for root and secret reveal routes
    if (url.pathname === "/" || url.pathname.startsWith("/secret/")) {
      return new Response(HTML_TEMPLATE, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          ...corsHeaders,
        },
      });
    }

    return errorResponse("Route not found", 404);
  },
};
