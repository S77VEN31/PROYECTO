import chalk from "chalk";

/**
 * Log levels enum for type safety
 */
export enum LogLevel {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

/**
 * Interface for logger configuration
 */
interface ILoggerConfig {
  showTimestamp: boolean;
  showLevel: boolean;
  environment: string;
}

/**
 * Logger class with colored output for better readability
 */
class Logger {
  private config: ILoggerConfig;

  constructor(config: Partial<ILoggerConfig> = {}) {
    this.config = {
      showTimestamp: true,
      showLevel: true,
      environment: process.env.NODE_ENV || "development",
      ...config,
    };
  }

  /**
   * Gets formatted timestamp string
   *
   * @returns {string} Formatted timestamp
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Formats log message with timestamp and level
   *
   * @param {LogLevel} level - Log level
   * @param {string} message - Log message
   * @returns {string} Formatted log message
   */
  private formatMessage(level: LogLevel, message: string): string {
    let formatted = "";

    if (this.config.showTimestamp) {
      formatted += chalk.gray(`[${this.getTimestamp()}]`);
    }

    if (this.config.showLevel) {
      const levelColors = {
        [LogLevel.INFO]: chalk.blue,
        [LogLevel.SUCCESS]: chalk.green,
        [LogLevel.WARN]: chalk.yellow,
        [LogLevel.ERROR]: chalk.red,
        [LogLevel.DEBUG]: chalk.magenta,
      };

      formatted += ` ${levelColors[level](`[${level}]`)}`;
    }

    return `${formatted} ${message}`;
  }

  /**
   * Logs info message in blue
   *
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  info(message: string, ...args: any[]): void {
    console.log(this.formatMessage(LogLevel.INFO, message), ...args);
  }

  /**
   * Logs success message in green
   *
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  success(message: string, ...args: any[]): void {
    console.log(this.formatMessage(LogLevel.SUCCESS, message), ...args);
  }

  /**
   * Logs warning message in yellow
   *
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage(LogLevel.WARN, message), ...args);
  }

  /**
   * Logs error message in red
   *
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  error(message: string, ...args: any[]): void {
    console.error(this.formatMessage(LogLevel.ERROR, message), ...args);
  }

  /**
   * Logs debug message in magenta (only in development)
   *
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  debug(message: string, ...args: any[]): void {
    if (this.config.environment === "development") {
      console.log(this.formatMessage(LogLevel.DEBUG, message), ...args);
    }
  }

  /**
   * Logs server startup information
   *
   * @param {string} port - Server port
   * @param {string} environment - Environment name
   */
  serverStart(port: string, environment: string): void {
    console.log(chalk.cyan("🚀 ================================"));
    console.log(chalk.cyan("🚀 Server Information"));
    console.log(chalk.cyan("🚀 ================================"));
    console.log(chalk.green(`🚀 Server running on port: ${chalk.bold(port)}`));
    console.log(chalk.green(`🚀 Environment: ${chalk.bold(environment)}`));
    console.log(chalk.green(`🚀 Time: ${chalk.bold(this.getTimestamp())}`));
    console.log(chalk.cyan("🚀 ================================"));
  }

  /**
   * Logs API request information
   *
   * @param {string} method - HTTP method
   * @param {string} url - Request URL
   * @param {number} statusCode - Response status code
   * @param {number} responseTime - Response time in ms
   */
  request(
    method: string,
    url: string,
    statusCode: number,
    responseTime: number
  ): void {
    const methodColor =
      {
        GET: chalk.green,
        POST: chalk.blue,
        PUT: chalk.yellow,
        DELETE: chalk.red,
        PATCH: chalk.magenta,
      }[method] || chalk.white;

    const statusColor =
      statusCode >= 400
        ? chalk.red
        : statusCode >= 300
        ? chalk.yellow
        : chalk.green;

    console.log(
      `${methodColor(method.padEnd(6))} ${url.padEnd(30)} ${statusColor(
        statusCode.toString()
      )} ${chalk.gray(`${responseTime}ms`)}`
    );
  }
}

/**
 * Global logger instance
 */
export const logger = new Logger();

/**
 * Express middleware for logging requests
 *
 * @param {any} req - Express request object
 * @param {any} res - Express response object
 * @param {Function} next - Next middleware function
 */
export const requestLogger = (req: any, res: any, next: Function): void => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.request(req.method, req.originalUrl, res.statusCode, duration);
  });

  next();
};

export default logger;
