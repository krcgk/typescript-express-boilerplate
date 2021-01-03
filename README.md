# Typescript Api Project

### Runtime
```bash
npm run build

node build/main.js --workers=8 --application=api --environment=production --port=8121
node build/main.js --application=web --environment=production --port=8120
node build/main.js --application=socket --environment=production --port=8122
node build/main.js --application=cron --environment=production
node build/main.js --workers=8--application=queue --environment=production
```

### Development
```bash
npm install && npm run build # one time only first installation

npm run watch
```

### Tests
```bash
npm run watch:test

# or 

npm run test
```

### Planned Features
- [ ] Worker Support
- [ ] Decorators for body validation and sanitization
- [ ] Repository Pattern for Data Layers
- [ ] DTO Objects
- [ ] Cluster Support
- [ ] oAuth Support
- [x] Websocket Support
- [ ] Sync Jobs
- [x] Cron Jobs
- [x] Queued Jobs

### Current Packages
* concurrently
* bull
* typedi
* yargs
* winston
* jest
* dotenv
* socket.io