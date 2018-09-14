interface firebaseApiParams {
  config: { databaseURL: string };
  version: string
}

interface api {
  db?: any;
  onServer?: boolean;
  cachedItems?: any;
  cachedIds?: any;
}
