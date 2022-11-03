const Arcade = artifacts.require("./Arcade.sol")

module.exports = async function (deployer) {
  await deployer.deploy(Arcade);
};

