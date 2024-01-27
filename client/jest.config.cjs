module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": [
            "babel-jest",
            { presets: ["@babel/preset-env", "@babel/preset-react"] },
        ],
    },
    // ... other Jest configurations
};
