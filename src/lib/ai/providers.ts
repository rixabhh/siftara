export interface AIProviderConfig {
  cloudflareAccountId?: string;
  cloudflareApiToken?: string;
  cloudflareModel?: string;
  openrouterApiKey?: string;
  openrouterModel?: string;
}

export interface AIGenerationResult {
  content: string;
  provider: string;
  model: string;
  tokensUsed: number;
  confidence: number;
}

function getConfig(): AIProviderConfig {
  return {
    cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
    cloudflareModel: process.env.CLOUDFLARE_AI_MODEL ?? "@cf/meta/llama-3.1-8b-instruct",
    openrouterApiKey: process.env.OPENROUTER_API_KEY,
    openrouterModel: process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.1-8b-instruct:free",
  };
}

export async function generateWithCloudflare(
  prompt: string,
  systemPrompt?: string
): Promise<AIGenerationResult | null> {
  const config = getConfig();
  if (!config.cloudflareAccountId || !config.cloudflareApiToken) return null;

  const url = `https://api.cloudflare.com/client/v4/accounts/${config.cloudflareAccountId}/ai/run/${config.cloudflareModel}`;

  const messages = [
    ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
    { role: "user" as const, content: prompt },
  ];

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.cloudflareApiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    if (data.success) {
      return {
        content: data.result?.response ?? "",
        provider: "cloudflare",
        model: config.cloudflareModel!,
        tokensUsed: data.result?.usage?.total_tokens ?? 0,
        confidence: 0.85,
      };
    }
  } catch {}
  return null;
}

export async function generateWithOpenRouter(
  prompt: string,
  systemPrompt?: string
): Promise<AIGenerationResult | null> {
  const config = getConfig();
  if (!config.openrouterApiKey) return null;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.openrouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://siftara.com",
        "X-Title": "Siftara",
      },
      body: JSON.stringify({
        model: config.openrouterModel,
        messages: [
          ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
          { role: "user", content: prompt },
        ],
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (content) {
      return {
        content,
        provider: "openrouter",
        model: config.openrouterModel!,
        tokensUsed: data.usage?.total_tokens ?? 0,
        confidence: 0.8,
      };
    }
  } catch {}
  return null;
}

export async function generate(
  prompt: string,
  systemPrompt?: string
): Promise<AIGenerationResult> {
  const cloudflare = await generateWithCloudflare(prompt, systemPrompt);
  if (cloudflare) return cloudflare;

  const openrouter = await generateWithOpenRouter(prompt, systemPrompt);
  if (openrouter) return openrouter;

  return {
    content: "",
    provider: "none",
    model: "none",
    tokensUsed: 0,
    confidence: 0,
  };
}
