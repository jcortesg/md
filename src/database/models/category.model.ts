import { Document, Model, model, Schema } from 'mongoose';

interface ICategory extends Document {
  name: string;
  permissions: {
    read: string[];
    write: string[];
  };
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: {
    read: [
      {
        type: String,
        enum: ['admin', 'creator', 'reader'],
        required: true
      }
    ],
    write: [
      {
        type: String,
        enum: ['admin', 'creator', 'reader'],
        required: true
      }
    ],
  },
});

export const Category: Model<ICategory> = model<ICategory>('Category', categorySchema);