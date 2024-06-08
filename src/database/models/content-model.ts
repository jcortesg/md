import { Document, Model, model, Schema } from 'mongoose';

interface IContent extends Document {
  title: string;
  description: string;
  url?: string;
  body?: string;
  createdBy: Schema.Types.ObjectId;
  topic: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
}

const contentSchema = new Schema<IContent>({
  title: {
    type: Schema.Types.String
  },
  description: {
    type: Schema.Types.String
  },
  body: {
    type: Schema.Types.String
  },
  url: {
    type: Schema.Types.String
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { timestamps: true });

export const Content: Model<IContent> = model<IContent>('Content', contentSchema);