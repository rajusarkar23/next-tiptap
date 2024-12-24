import mongoose, { Schema } from "mongoose";

const TipTapSchema = new Schema(
  {
    richText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const TipTap = mongoose.models.TipTap || mongoose.model("TipTap", TipTapSchema);
