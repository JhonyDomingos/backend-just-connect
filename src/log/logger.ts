import chalk from "chalk";

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(chalk.blue("[INFO]"), message, ...args);
  },
  error: (message: string, error?: Error) => {
    console.error(chalk.red("[ERROR]"), message);
    if (error?.stack) {
      console.error(chalk.red(error.stack));
    }
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(chalk.yellow("[WARN]"), message, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(chalk.green("[SUCCESS]"), message, ...args);
  },
};
