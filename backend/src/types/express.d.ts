/**
 * Express type extensions
 * Extends Express Request interface to include user property
 */

import { User } from "colori-platform-shared";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
} 