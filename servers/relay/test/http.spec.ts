import "mocha";
import axios, { AxiosInstance } from "axios";
import { use, expect } from "chai";
import chaiHttp from "chai-http";

import { TEST_RELAY_URL, TEST_TOPIC } from "./shared";

use(chaiHttp);

describe("HTTP", () => {
  let api: AxiosInstance;
  beforeEach(() => {
    api = axios.create({
      baseURL: TEST_RELAY_URL,
      timeout: 30000, // 30 secs
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  });
  it("GET health", async () => {
    const response = await api.get("/health");
    expect(response.status).to.equal(204);
  });
  it("GET hello", async () => {
    const response = await api.get("/hello");
    expect(response.status).to.equal(200);
    expect(response.data.startsWith(`Hello World, this is WalletConnect`)).to.be.true;
  });
  it("POST subscribe", async () => {
    const payload = { topic: TEST_TOPIC, webhook: "https://example.com" };
    const response = await api.post("/subscribe", payload);
    expect(response.status).to.equal(200);
    expect(response.data).to.deep.equal({ success: true });
  });
});
