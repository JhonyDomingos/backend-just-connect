import { Request, Response } from "express";
import { SSEService } from "../../services/notifications/SSEService";

class SSEController {
  public streamNotifications(req: Request, res: Response): void {
    const { sub } = res.locals.decodedToken;

    SSEService.addClient(sub, res);

    req.on("close", () => {
      SSEService.removeClient(sub);
    });
  }
}

export { SSEController };
