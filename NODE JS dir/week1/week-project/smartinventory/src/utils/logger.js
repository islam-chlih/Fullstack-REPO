// smartinventory/src/utils/logger.js
const EventEmitter = require('events');

class Logger extends EventEmitter {
  constructor() {
    super();
    // Listen for general log events (optional, can be expanded)
    this.on('log', (message) => {
      console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
    });

    // Listen for request received events
    this.on('request:received', ({ method, url }) => {
      console.log(`[REQUEST] ${new Date().toISOString()} - ${method} ${url}`);
    });

    // Listen for response sent events
    this.on('response:sent', ({ statusCode, route, duration }) => {
      console.log(`[RESPONSE] ${new Date().toISOString()} - Status: ${statusCode}, Route: ${route || 'N/A'}, Duration: ${duration}ms`);
    });

    // Listen for error events
    this.on('error', ({ message, stack, route }) => {
      console.error(`[ERROR] ${new Date().toISOString()} - Route: ${route || 'N/A'}\nMessage: ${message}\nStack: ${stack}`);
    });
  }

  // Helper method to emit a general log
  log(message) {
    this.emit('log', message);
  }

  // Helper method to emit a request received event
  requestReceived(method, url) {
    this.emit('request:received', { method, url });
  }

  // Helper method to emit a response sent event
  responseSent(statusCode, route, startTime) {
    const duration = Date.now() - startTime;
    this.emit('response:sent', { statusCode, route, duration });
  }

  // Helper method to emit an error event
  error(errorObj, route) {
    this.emit('error', {
      message: errorObj.message || 'An unknown error occurred',
      stack: errorObj.stack || 'No stack trace available',
      route: route
    });
  }
}

module.exports = new Logger(); // Export a singleton instance