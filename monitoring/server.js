// Import necessary modules
const express = require('express');
const app = express();
const promClient = require('prom-client');

// Enable default Prometheus metrics collection (e.g., memory, CPU usage)
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

// Custom metric: HTTP request duration
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
});

// Middleware to start a timer and collect request duration
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ route: req.route ? req.route.path : req.url, method: req.method, code: res.statusCode });
  });
  next();
});

// Example endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Expose Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
