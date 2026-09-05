const Requirement = require('../models/Requirement');

const VALID_CATEGORIES = ['planner', 'performer', 'crew'];

function buildCategorisedPayload(body) {
  const {
    eventName,
    eventType,
    isDateRange,
    startDate,
    endDate,
    location,
    venue,
    category,
    plannerDetails,
    performerDetails,
    crewDetails
  } = body;

  const base = {
    eventName,
    eventType,
    isDateRange: Boolean(isDateRange),
    startDate,
    endDate: isDateRange ? endDate : undefined,
    location,
    venue,
    category
  };

  if (category === 'planner') base.plannerDetails = plannerDetails;
  if (category === 'performer') base.performerDetails = performerDetails;
  if (category === 'crew') base.crewDetails = crewDetails;

  return base;
}

exports.createRequirement = async (req, res, next) => {
  try {
    const { eventName, eventType, startDate, location, category } = req.body;

    if (!eventName || !eventType || !startDate || !location || !category) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields: eventName, eventType, startDate, location and category are all required.'
      });
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category "${category}". Must be one of: ${VALID_CATEGORIES.join(', ')}.`
      });
    }

    const requirement = await Requirement.create(buildCategorisedPayload(req.body));

    res.status(201).json({ success: true, data: requirement });
  } catch (error) {
    next(error);
  }
};

exports.getRequirements = async (req, res, next) => {
  try {
    const { category } = req.query;

    if (category && !VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category filter "${category}".`
      });
    }

    const filter = category ? { category } : {};
    const requirements = await Requirement.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, count: requirements.length, data: requirements });
  } catch (error) {
    next(error);
  }
};

exports.getRequirementById = async (req, res, next) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found.' });
    }

    res.json({ success: true, data: requirement });
  } catch (error) {
    next(error);
  }
};
