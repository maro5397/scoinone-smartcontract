import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const StreamerTokenModule = buildModule("StreamerTokenModule", (m) => {
  const name = m.getParameter("name", "StreamerToken");
  const symbol = m.getParameter("symbol", "STK");

  const token = m.contract("StreamerToken", [name, symbol]);

  return { token };
});

export default StreamerTokenModule;
