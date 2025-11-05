const path = require('path');

const ALIASES = [];

module.exports = {
  aliases: ALIASES,
  buildAliases: (rootPath = __dirname) =>
    ALIASES.reduce(
      (res, folder) => ({ ...res, [folder]: path.resolve(rootPath, `./src/${folder.slice(1)}/`) }),
      {}
    )
};
