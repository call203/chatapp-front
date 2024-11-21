module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|leess|scss|sass|gif|png)$": "identity-obj-proxy",
    "@/(.*)": "<rootDir>/src/$1"
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
