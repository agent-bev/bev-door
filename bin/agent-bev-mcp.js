#!/usr/bin/env node
// @agent-bev/mcp-server — a stdio bridge to the agent-bev remote door (https://mcp.bev-buyer.ai/mcp).
// Reads newline-delimited JSON-RPC messages on stdin, posts each to the remote door, writes each answer to stdout.
// No dependencies. Set AGENT_BEV_URL to point at another agent-bev door (for example a country node door).
import { createInterface } from "node:readline";

const URL = process.env.AGENT_BEV_URL || "https://mcp.bev-buyer.ai/mcp";
const UA = "agent-bev-mcp-server/0.2.1 (+https://agent-bev.ai)";
const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
// No forced exit: when stdin closes and the last answer is written, Node exits on its own (a forced exit while a fetch socket is
// closing trips a libuv assertion on Windows).

async function forward(line) {
  let msg;
  try { msg = JSON.parse(line); } catch { return write({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "parse error" } }); }
  const ids = [].concat(msg).filter((m) => m && m.id !== undefined).map((m) => m.id);
  try {
    const res = await fetch(URL, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream", "user-agent": UA }, body: JSON.stringify(msg) });
    if (res.status === 202 || res.status === 204) return;
    const text = await res.text();
    if (!text) return;
    let out; try { out = JSON.parse(text); } catch { out = null; }
    if (out) return write(out);
    for (const id of ids) write({ jsonrpc: "2.0", id, error: { code: -32603, message: `remote door answered ${res.status}` } });
  } catch (e) {
    for (const id of ids) write({ jsonrpc: "2.0", id, error: { code: -32603, message: `remote door unreachable: ${e.message}` } });
  }
}
function write(o) { process.stdout.write(JSON.stringify(o) + "\n"); }
rl.on("line", (line) => { if (line.trim()) forward(line); });
