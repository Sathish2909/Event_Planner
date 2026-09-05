const mongoose = require('mongoose');

const { Schema } = mongoose;



const plannerDetailsSchema = new Schema(
  {
    servicesNeeded: [{ type: String }],
    estimatedBudget: { type: String },
    expectedGuestCount: { type: Number },
    preferredTheme: { type: String },
    planningExperienceLevel: { type: String },
    additionalNotes: { type: String }
  },
  { _id: false }
);

const performerDetailsSchema = new Schema(
  {
    performanceType: { type: String },
    genreOrStyle: { type: String },
    performanceDuration: { type: String },
    numberOfPerformers: { type: Number },
    soundSystemRequired: { type: String },
    stageSizeNeeded: { type: String },
    equipmentNeeded: [{ type: String }],
    soundcheckTime: { type: String },
    expectedAudienceSize: { type: Number }
  },
  { _id: false }
);

const crewDetailsSchema = new Schema(
  {
    crewType: [{ type: String }],
    numberOfCrewNeeded: { type: Number },
    shiftStart: { type: String },
    shiftEnd: { type: String },
    uniformRequired: { type: String },
    experienceLevel: { type: String },
    languagePreferences: [{ type: String }],
    specialInstructions: { type: String }
  },
  { _id: false }
);

const requirementSchema = new Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    isDateRange: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true },

    category: {
      type: String,
      required: true,
      enum: ['planner', 'performer', 'crew']
    },

    plannerDetails: plannerDetailsSchema,
    performerDetails: performerDetailsSchema,
    crewDetails: crewDetailsSchema,

    status: { type: String, default: 'submitted' }
  },
  { timestamps: true }
);


requirementSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Requirement', requirementSchema);
