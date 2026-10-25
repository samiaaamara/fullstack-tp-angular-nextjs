
import { Schema, model } from 'mongoose';

export interface IAppareil {
  name: string;
  status: 'On' | 'Off';
}

const appareilSchema = new Schema<IAppareil>(
  {
    name: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [100, 'Le nom ne doit pas dépasser 100 caractères'],
    },
    status: {
      type: String,
      enum: ['On', 'Off'],
      default: 'Off',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Appareil = model<IAppareil>('Appareil', appareilSchema);
