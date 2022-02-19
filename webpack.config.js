//

const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = async (env) => {
  const brand = env.BRAND;

  return {
    mode: "development",

    entry: {
      manifest: ["manifest.js"],
    },

    resolve: {
      modules: [`brand/${brand}`, "app/assets", "node_modules"],
    },

    module: {
      rules: [
        {
          test: /\.svg$/i,
          type: "asset/resource",
        },
      ],
    },

    plugins: [
      new WebpackAssetsManifest({
        output: `assets-manifest-${brand}.json`,
        integrity: true,
        integrityHashes: ["sha384"],
        writeToDisk: true,
        contextRelativeKeys: true,
        // Ignore a source maps and compressed files.
        customize(entry, original, manifest, asset) {
          // Skip source maps
          if (entry.key.endsWith(".map") || entry.key.endsWith(".gz")) {
            return false;
          }

          debugger;

          return entry;
        },
      }),
    ],
  };
};
