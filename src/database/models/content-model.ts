import { Document, Model, model, Schema } from 'mongoose';
import { IUser, ITopic, ICategory }  from '../../interfaces/user-interface'

interface IContent extends Document {
  title: string;
  description: string;
  url?: string;
  body?: string;
  createdBy: IUser;
  topic: ITopic;
  category: ICategory;
  toAuthJSON(): any;
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

contentSchema.methods.toAuthJSON = function (): any {
  // Include nested model properties in the JSON response
  return {
    _id: this._id,
    title: this.title,
    description: this.description,
    body: this.body,
    url: this.url,
    topic: {
      _id: this.topic._id, // Include topic ID
      name: this.topic.name, // Include topic name (assuming it exists)
    },
    category: {
      _id: this.category._id, // Include category ID
      name: this.category.name, // Include category name (assuming it exists)
    },
    createdBy: {
      _id: this.createdBy._id, // Include creator ID
      name: this.createdBy.username, // Include creator name (assuming it exists)
    },
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};
export const Content: Model<IContent> = model<IContent>('Content', contentSchema);