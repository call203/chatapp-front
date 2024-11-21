module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|leess|scss|sass|gif|png)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
