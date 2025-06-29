// middleware/log.js
const { Log } = require("../models");

const log = (action, targetType = null) => {
  return async (req, res, next) => {
    res.on("finish", async () => {
      // Only log if request was successful
      if (res.statusCode < 400) {
        try {
          await Log.create({
            action,
            actor_id: req.user?.id || null, // If auth middleware is used
            target_id: req.body?.id || null,
            target_type: targetType,
            description: `Action '${action}' performed by user ${req.user?.id || "unknown"}`,
            timestamp: new Date(),
          });
        } catch (err) {
          console.error("Log middleware error:", err);
        }
      }
    });

    next();
  };
};

module.exports = log;

