import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("StreamerToken", () => {
  async function deployStreamerTokenFixture() {
    const [owner, addr1, addr2] = await hre.viem.getWalletClients();
    const streamerToken = await hre.viem.deployContract("StreamerToken", ["StreamerToken", "STK"]);
    return { streamerToken, owner, addr1, addr2 };
  }

  describe("Deployment", () => {
    it("Should assign the total supply to the owner", async () => {
      const { streamerToken, owner } = await loadFixture(deployStreamerTokenFixture);
      const totalSupply = await streamerToken.read.totalSupply();
      const ownerBalance = await streamerToken.read.balanceOf([owner.account.address]);
      expect(ownerBalance).to.equal(totalSupply);
    });
  });

  describe("Transfer", () => {
    it("Should transfer tokens between accounts", async () => {
      const { streamerToken, owner, addr1 } = await loadFixture(deployStreamerTokenFixture);
      const amount = 1000n * 10n ** 18n;
      await streamerToken.write.transfer([addr1.account.address, amount], { account: owner.account });
      const addr1Balance = await streamerToken.read.balanceOf([addr1.account.address]);
      expect(addr1Balance).to.equal(amount);
    });

    it("Should fail if sender doesn’t have enough tokens", async () => {
      const { streamerToken, addr1, addr2 } = await loadFixture(deployStreamerTokenFixture);
      const amount = 1000n * 10n ** 18n;
      await expect(streamerToken.write.transfer([addr2.account.address, amount], { account: addr1.account }))
          .to.be.rejected;
    });
  });
});
