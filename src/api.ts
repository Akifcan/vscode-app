import { PromptProps } from "./api.type";

class Api {
  private baseUrl: string = "http://localhost:3000";

  async prompt(content: string): Promise<PromptProps> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt: content }),
    });
    const data = await response.json();
    return data as PromptProps;
  }
}

const api = new Api();

export default api;
