import json from 'edit-json-file';

const file = json(`${__dirname}/data.json`);
const articles = file.get('articles').flat();
file.set('articles', articles);
file.save();
