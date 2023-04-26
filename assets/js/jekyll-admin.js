import(/* webpackChunkName: "jekyll-admin" */ 'jekyll-admin').then((JekyllAdmin) => {
  const admin = new JekyllAdmin.default({
    basePath: '/admin',
    paths: {
      collections: '_collections',
      data: '_data',
      drafts: '_drafts',
      includes: '_includes',
      layouts: '_layouts',
      posts: '_posts',
      site: '_config.yml'
    }
  });
  admin.init();
}).catch((err) => {
  console.log('Error loading Jekyll Admin:', err);
});

