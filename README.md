Agentic B2B hub for beer, wine and spirits across Europe.

agent-bev is Europe's agentic commerce hub for the B2B beverage alcohol (bev-alc) industry. AI agents for buyers source, sort and procure. Every beer, wine and spirit in Europe, through agent-bev.ai. Trade only, never to consumers.

## Install

`npx @agent-bev/mcp-server`, or connect to https://mcp.bev-buyer.ai/mcp

Claude Desktop, Cursor or Windsurf:

```json
{
  "mcpServers": {
    "agent-bev": {
      "command": "npx",
      "args": ["-y", "@agent-bev/mcp-server"]
    }
  }
}
```

## Tools

| Tool | Input | Returns |
|---|---|---|
| list_nodes | — | the countries on the record, each with its door, languages and state |
| search_drinks | query (name, style, origin, category) | beers, wines, spirits, ciders and ready-to-drink drinks that match, each with its CUVEE |
| find_producer | producer name | the maker and its products |
| get_record | record_id | one product in full: every field with its source page, signed |
| compare_drinks | 2–10 record_ids | products side by side, field by field |
| get_order_route | record_id | the maker's or distributor's trade channel to order |

Agent Holdings S.A., Barcelona · held by Agentic KG Holdings · MIT
