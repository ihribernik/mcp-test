#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Character } from "./interfaces";

const RAM_API_BASE = "https://rickandmortyapi.com/api/character";
const USER_AGENT = "rick-and-morty-api-client/1.0";

const server = new McpServer({
  name: "Rick and Morty API Client",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

async function fetchCharacters<T>(url: string): Promise<T | null> {
  try {
    const headers = {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    };
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
}

function formatCharacterInfo(character: Character) {
  return [
    `Name: ${character.name}`,
    `Status: ${character.status}`,
    `Species: ${character.species}`,
    `Type: ${character.type}`,
    `Gender: ${character.gender}`,
    `Created: ${character.created}`,
    "---",
  ].join("\n");
}

server.tool(
  "getCharacters",
  "get character info by id",
  {
    id: z.number().describe("The id of the character."),
  },
  async ({ id }) => {
    const characterUrl = `${RAM_API_BASE}/[${id}]`;
    const characterData = await fetchCharacters<Character[]>(characterUrl);

    if (!characterData) {
      return {
        content: [
          {
            type: "text",
            text: "failed to get the character data",
          },
        ],
      };
    }
    const characterInfo = characterData.map(formatCharacterInfo);
    const characterText = `Info for the character ${id}: \n\n ${characterInfo}`;
    return {
      content: [
        {
          type: "text",
          text: characterText,
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Rick and morty MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
