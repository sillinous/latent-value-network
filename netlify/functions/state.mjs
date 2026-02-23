// LVN Simulation State Management
// Save, load, and share states from LVN's 7 interactive tools
// Uses Netlify Blobs for persistence (no database needed)

import { getStore } from "@netlify/blobs";

export default async (req) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") return new Response("OK", { headers });

  const store = getStore({ name: "lvn-states", consistency: "strong" });
  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  try {
    // GET: Load state or list
    if (req.method === "GET") {
      const stateId = url.searchParams.get("id");

      if (stateId) {
        const data = await store.get(stateId, { type: "json" });
        if (!data) return new Response(JSON.stringify({ error: "State not found" }), { status: 404, headers });
        data.views = (data.views || 0) + 1;
        await store.setJSON(stateId, data);
        return new Response(JSON.stringify(data), { headers });
      }

      if (action === "list") {
        const tool = url.searchParams.get("tool") || "all";
        const { blobs } = await store.list({ prefix: tool === "all" ? "" : `${tool}:` });
        const states = [];
        for (const blob of blobs.slice(0, 20)) {
          try {
            const data = await store.get(blob.key, { type: "json" });
            if (data && data.public !== false) {
              states.push({ id: blob.key, tool: data.tool, name: data.name, description: data.description, views: data.views, createdAt: data.createdAt });
            }
          } catch (e) { /* skip corrupt entries */ }
        }
        return new Response(JSON.stringify({ states, count: states.length }), { headers });
      }

      return new Response(JSON.stringify({
        service: "LVN State Management",
        tools: ["temporal-simulator", "equity-monitor", "federation-map", "pilot-navigator", "wd-architecture", "suite-launcher"],
        endpoints: {
          save: "POST /api/state { tool, name, parameters, description?, isPublic? }",
          load: "GET /api/state?id=<stateId>",
          list: "GET /api/state?action=list&tool=<tool>",
          delete: "DELETE /api/state?id=<stateId>",
        },
        crossSell: [
          { platform: "PLE Community", url: "https://postlaboreconomics.netlify.app", desc: "Discuss your simulation results" },
          { platform: "ORACLE Intelligence", url: "https://oracle-intelligence.netlify.app", desc: "Market research for your models" },
        ],
      }), { headers });
    }

    // POST: Save state
    if (req.method === "POST") {
      const body = await req.json();
      const { tool, name, parameters, description, isPublic } = body;

      if (!tool || !name || !parameters) {
        return new Response(JSON.stringify({ error: "Required: tool, name, parameters" }), { status: 400, headers });
      }

      const id = `${tool}:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const state = {
        id, tool, name,
        description: description || "",
        parameters,
        public: isPublic !== false,
        views: 0,
        createdAt: new Date().toISOString(),
      };

      await store.setJSON(id, state);

      return new Response(JSON.stringify({
        id,
        shareUrl: `https://latent-value-network.netlify.app/?state=${encodeURIComponent(id)}`,
        message: "State saved",
      }), { status: 201, headers });
    }

    // DELETE: Remove state
    if (req.method === "DELETE") {
      const stateId = url.searchParams.get("id");
      if (!stateId) return new Response(JSON.stringify({ error: "Provide ?id=" }), { status: 400, headers });
      await store.delete(stateId);
      return new Response(JSON.stringify({ deleted: true }), { headers });
    }

    return new Response("Method not allowed", { status: 405, headers });
  } catch (error) {
    console.error("LVN state error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
};

export const config = { path: "/api/state" };
