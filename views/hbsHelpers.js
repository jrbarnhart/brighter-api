import hbs from 'handlebars';

hbs.registerHelper('prod', () => {
  return process.env.NODE_ENV === 'production';
});
