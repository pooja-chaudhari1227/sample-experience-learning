module.exports = {
  name: "ExtensionCards",
  publisher: "Sample",
  cards: [
    {
      type: "ExtensionCardsCard",
      source: "./src/cards/ExtensionCardsCard",
      title: "ExtensionCards Card",
      displayCardType: "ExtensionCards Card",
      description:
        "This is an introductory card to the Ellucian Experience SDK",
      configuration: {
        client: [
          {
            key: "apiKey",
            label: "Client API Key",
            type: "password",
            required: true,
          },
        ],
        server: [
          {
            key: "apiKey",
            label: "API Key",
            type: "password",
            required: true,
          },
        ],
      },
      // pageRoute: {
      //     route: '/',
      //     excludeClickSelectors: ['a']
      // }
    },
  ],
  page: {
    source: "./src/page/router.jsx",
  },
};
