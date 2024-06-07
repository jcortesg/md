import { Document, Model, model, Schema } from 'mongoose';

interface ITopic extends Document {
  name: string;
  permissions: {
    images: boolean;
    videos: boolean;
    texts: boolean;
  };
}

const topicSchema = new Schema<ITopic>({
  name: { type: Schema.Types.String, required: true, unique: true },
  permissions: {
    images: { type: Schema.Types.Boolean, required: true },
    videos: { type: Schema.Types.Boolean, required: true },
    texts: { type: Schema.Types.Boolean, required: true },
  }
}, { timestamps: true });

export const Topic: Model<ITopic> = model<ITopic>('Topic', topicSchema);
