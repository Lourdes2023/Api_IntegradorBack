import { Model, Schema, Types, model } from "mongoose";
import { Type } from "typescript";

export interface IIssue {
    title: string;
    description: string;
    priority: number;
    user: Types.ObjectId;
    createAt: Date;
}

const IssueSchema = new Schema<IIssue>({
   title: { 
    type: String,
     required:[ true, "El titulo es obligatorio" ]
     },
    description: {
            type: String,
            required:[ true, "La descripcion es obligatoria" ]
            },
    priority: {
            type: Number,
            required:[ true, "La prioridad es obligatoria" ]
            },
    user: { 
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    createAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Issue: Model<IIssue> = model("Issue", IssueSchema);

export default Issue;