import { Request, Response } from 'express';
import Issue, { IIssue } from '../models/issue';
import { ObjectId } from 'mongoose';

export const postNewIssue = async (req: Request, res: Response): Promise<void> => {
   const { title, description, priority }: IIssue = req.body;
   const usuario: ObjectId = req.body.usuarioConectado._id;
   const issueData = {
        title,
        description,
        priority,
        user: usuario,
        createdAT: new Date(),
    }
    const issue = new Issue(issueData);

    await issue.save();
    res.status(201).json({
        msg: "Issue creada correctamente",
        issue
    });
}



