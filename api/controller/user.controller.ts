import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import Path from "path";

import { getRepository } from "typeorm";
import { Session, User } from "../entity";

export class UserController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/users")
      .get((req: Request, res: Response) => {
        const userRepo = getRepository(User);
        userRepo.find().then((users: User[]) => {
          res.status(200).send({ users });
        });
      })
      .post((req: Request, res: Response) => {
        const userRepo = getRepository(User);
        const { firstName, lastName, username, password, admin } = req.body;
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.password = password;
        user.admin = admin;
        userRepo.save(user).then(
          createdUser => {
            res.status(200).send({ createdUser });
          },
          (reason: any) => {
            res.status(500).send({ reason: "The email was not unique" });
          }
        );
      });
    router.route("/users/:id").post(
      this.isAuthenticated(true),
      multer({
        dest: Path.join(__dirname, "..", "public", "profilePhotos")
      }).single("profilePhoto"),
      (req: Request, res: Response) => {
        const userRepo = getRepository(User);
        userRepo.findOne(req.params.id).then((user: User | undefined) => {
          if (user) {
            if (req.file) {
              userRepo.save(user).then((savedUser: User) => {
                res.send({ user: savedUser });
              });
            } else {
              res.sendStatus(500);
            }
          } else {
            res.sendStatus(500);
          }
        });
      }
    );
    router.route("/users/:id")
      .get((req: Request, res: Response) => {
        const userRepo = getRepository(User);
        userRepo.findOne(req.params.id).then(
          (user: User | undefined) => {
            if (user) {
              res.send({ user });
            } else {
              res.sendStatus(404);
            }
          },
          () => {
            res.sendStatus(404);
          }
        );
      })
      .delete((req: Request, res: Response) => {
        const userRepo = getRepository(User);
        userRepo.findOneOrFail(req.params.id).then((foundUser: User) => {
          userRepo.remove(foundUser).then((updatedUser: User) => {
            res.status(200).send({ user: updatedUser });
          });
        });
      })
      .put((req: Request, res: Response) => {
        const userRepo = getRepository(User);
        userRepo.findOneOrFail(req.params.id).then((foundUser: User) => {
          // save updates here
          foundUser.firstName = req.body.firstName;
          foundUser.lastName = req.body.lastName;
          foundUser.username = req.body.username;
          foundUser.password = req.body.password;
          foundUser.admin = req.body.admin;
          userRepo.save(foundUser).then((updatedUser: User) => {
            res.status(200).send({ user: updatedUser });
          });
        });
      });
    return router;
  }

  protected isAuthenticated(checkSameUser: boolean = false) {
    return (req: Request, res: Response, next: NextFunction) => {
      const token: string | undefined = req.get("token");
      if (token) {
        const sessionRepo = getRepository(Session);
        sessionRepo
          .findOne(token, { relations: ["user"] })
          .then((foundSession: Session | undefined) => {
            if (
              foundSession &&
              ((checkSameUser &&
                foundSession.user.id === parseInt(req.params.id, 10)) ||
                !checkSameUser) &&
              foundSession.expiresAt.getTime() > new Date().getTime()
            ) {
              next();
            } else {
              res.sendStatus(403);
            }
          });
      } else {
        res.sendStatus(401);
      }
    };
  }
}

export default UserController;
