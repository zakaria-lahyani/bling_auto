/**
 * General Purpose Logger
 * 
 * A simplified logging utility for application events,
 * user actions, and debug information (not just errors).
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogContext {
  component?: string
  action?: string
  userId?: string
  metadata?: Record<string, any>
}

class ApplicationLogger {
  private minLevel: LogLevel
  private isDevelopment: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.minLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.minLevel
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.shouldLog(level)) return

    const timestamp = new Date().toISOString()
    const prefix = this.getPrefix(level)
    const component = context?.component ? `[${context.component}]` : ''
    
    const logData = {
      timestamp,
      level: LogLevel[level],
      message,
      component: context?.component,
      action: context?.action,
      userId: context?.userId,
      metadata: context?.metadata,
    }

    if (this.isDevelopment) {
      // Development: Pretty formatted logs
      console.log(`${prefix} ${timestamp} ${component} ${message}`, context?.metadata || '')
    } else {
      // Production: Structured JSON logs
      switch (level) {
        case LogLevel.ERROR:
          console.error(JSON.stringify(logData))
          break
        case LogLevel.WARN:
          console.warn(JSON.stringify(logData))
          break
        default:
          console.log(JSON.stringify(logData))
      }
    }
  }

  private getPrefix(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '🔍'
      case LogLevel.INFO:
        return 'ℹ️'
      case LogLevel.WARN:
        return '⚠️'
      case LogLevel.ERROR:
        return '🚨'
      default:
        return '📝'
    }
  }

  debug(message: string, context?: LogContext): void {
    this.formatMessage(LogLevel.DEBUG, message, context)
  }

  info(message: string, context?: LogContext): void {
    this.formatMessage(LogLevel.INFO, message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.formatMessage(LogLevel.WARN, message, context)
  }

  error(message: string, context?: LogContext): void {
    this.formatMessage(LogLevel.ERROR, message, context)
  }

  // Convenience methods for common patterns
  userAction(action: string, userId?: string, metadata?: Record<string, any>): void {
    this.info(`User action: ${action}`, {
      component: 'user-interaction',
      action,
      userId,
      metadata,
    })
  }

  apiCall(method: string, url: string, context?: LogContext): void {
    this.debug(`API ${method} ${url}`, {
      component: 'api-client',
      action: 'api-call',
      ...context,
      metadata: { method, url, ...context?.metadata },
    })
  }

  apiError(method: string, url: string, error: any, context?: LogContext): void {
    this.error(`API ${method} ${url} failed`, {
      component: 'api-client',
      action: 'api-error',
      ...context,
      metadata: { method, url, error: error.message, ...context?.metadata },
    })
  }

  formSubmission(formName: string, success: boolean, context?: LogContext): void {
    const level = success ? LogLevel.INFO : LogLevel.WARN
    const message = `Form ${formName} ${success ? 'submitted successfully' : 'submission failed'}`
    
    this.formatMessage(level, message, {
      component: 'form-handling',
      action: 'form-submission',
      ...context,
      metadata: { formName, success, ...context?.metadata },
    })
  }
}

// Singleton instance
export const logger = new ApplicationLogger()

// Export convenience functions for common use cases
export const logUserAction = (action: string, userId?: string, metadata?: Record<string, any>) => 
  logger.userAction(action, userId, metadata)

export const logApiCall = (method: string, url: string, context?: LogContext) => 
  logger.apiCall(method, url, context)

export const logApiError = (method: string, url: string, error: any, context?: LogContext) => 
  logger.apiError(method, url, error, context)

export const logFormSubmission = (formName: string, success: boolean, context?: LogContext) => 
  logger.formSubmission(formName, success, context)