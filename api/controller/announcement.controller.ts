import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Announcement } from "../entity";

import { getRepository } from "typeorm";

export class AnnouncementController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/announcements")
      .get((req: Request, res: Response) => {
        const itemRepo = getRepository(Announcement);
        itemRepo.find().then((items: Announcement[]) => {
          res.status(200).send({ items });
        });
      })
      .post((req: Request, res: Response) => {
        const token = req.get("token");
        const announceRepo = getRepository(Announcement);
        const announce = new Announcement();
        announce.title = req.body.title;
        announce.desc = req.body.desc;
        announceRepo.save(announce).then(createdAnnounce => {
          res.status(200).send({ createdAnnounce });
        });
      });

    router.route("/announcements/:id")
      .delete((req: Request, res: Response) => {
        const itemRepo = getRepository(Announcement);
        itemRepo.findOneOrFail(req.params.id).then((foundAnnounce: Announcement) => {
          itemRepo.remove(foundAnnounce).then((updatedAnnounce: Announcement) => {
            res.status(200).send({ announce: updatedAnnounce });
          });
        });
      })
      .get((req: Request, res: Response) => {
        const itemRepo = getRepository(Announcement);
        itemRepo.findOneOrFail(req.params.id).then((item: Announcement) => {
          res.status(200).send({ item });
        });
      })
      .put((req: Request, res: Response) => {
        const itemRepo = getRepository(Announcement);
        itemRepo.findOneOrFail(req.params.id).then((foundAnnounce: Announcement) => {
          // save updates here
          foundAnnounce.title = req.body.title;
          foundAnnounce.desc = req.body.desc;
          itemRepo.save(foundAnnounce).then((updatedAnnounce: Announcement) => {
            res.status(200).send({ announce: updatedAnnounce });
          });
        });
      });

    return router;
  }
}
