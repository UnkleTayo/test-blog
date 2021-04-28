const slugify = require('slugify');

const slugifyUrl = (str) => {
  slugify(str, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
  });
};

module.exports = slugifyUrl;
