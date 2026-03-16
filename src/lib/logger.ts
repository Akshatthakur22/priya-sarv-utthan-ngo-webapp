import { isDevelopment } from './env';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
}

class Logger {
  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context } = entry;
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    const formattedLog = this.formatLog(entry);

    if (isDevelopment) {
      // In development, use console methods for better debugging
      switch (level) {
        case 'error':
          console.error(formattedLog);
          break;
        case 'warn':
          console.warn(formattedLog);
          break;
        case 'info':
          console.info(formattedLog);
          break;
        case 'debug':
          console.debug(formattedLog);
          break;
      }
    } else {
      // In production, you might want to send logs to a service
      // For now, we'll still use console but without debug logs
      if (level !== 'debug') {
        console.log(formattedLog);
      }
    }

    // TODO: In production, integrate with logging service like:
    // - Sentry for error tracking
    // - LogRocket for session replay
    // - CloudWatch, DataDog, etc.
  }

  error(message: string, context?: Record<string, any>) {
    this.log('error', message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context);
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context);
  }

  debug(message: string, context?: Record<string, any>) {
    this.log('debug', message, context);
  }

  // Specific logging methods for common operations
  apiError(method: string, endpoint: string, error: any, context?: Record<string, any>) {
    this.error(`API Error: ${method} ${endpoint}`, {
      error: error.message || error,
      stack: error.stack,
      endpoint,
      method,
      ...context,
    });
  }

  apiSuccess(method: string, endpoint: string, context?: Record<string, any>) {
    this.info(`API Success: ${method} ${endpoint}`, context);
  }

  emailSent(to: string, subject: string, context?: Record<string, any>) {
    this.info(`Email sent successfully`, {
      to,
      subject,
      ...context,
    });
  }

  emailError(to: string, subject: string, error: any, context?: Record<string, any>) {
    this.error(`Failed to send email`, {
      to,
      subject,
      error: error.message || error,
      ...context,
    });
  }

  formSubmission(formName: string, data: Record<string, any>) {
    this.info(`Form submitted: ${formName}`, {
      formName,
      timestamp: new Date().toISOString(),
      // Don't log sensitive data like passwords, emails, etc.
      ...Object.fromEntries(
        Object.entries(data).filter(([key]) => 
          !['password', 'email', 'phone', 'address'].includes(key.toLowerCase())
        )
      ),
    });
  }
}

export const logger = new Logger();
