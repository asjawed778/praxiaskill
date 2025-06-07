import { Request, Response, NextFunction } from "express";
import { visitorQueue } from "../queue/queues/visitor.queue";

export const trackVisitor = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.path.startsWith("/dashboard") || req.path.startsWith("/api-docs")) {
      return next();
    }

    visitorQueue.add('track-visitor', {
      ip: req.ip,
      path: req.path,
      headers: req.headers
    });

  } catch (err) {
    console.error("Visitor tracking failed:", err);
  }
  
  next();
};