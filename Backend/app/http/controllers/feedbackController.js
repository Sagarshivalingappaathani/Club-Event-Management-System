const Feedback = require('../../models/feedback');
const Event = require('../../models/event');

function feedbackController() {
  return {
    
    async postFeedback(req, res) {
      const { userId, eventId, feedbackText, rating } = req.body;
  
      try {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
  
        // Check if feedback already exists for the userId and eventId
        let existingFeedback = await Feedback.findOne({ user: userId, event: eventId });
  
        if (existingFeedback) {
          // If feedback exists, update it
          existingFeedback.feedbackText = feedbackText;
          existingFeedback.rating = rating;
          await existingFeedback.save();
          console.log('Feedback updated successfully');
          return res.status(200).json({ message: 'Feedback updated successfully' });
        } else {
          // If feedback does not exist, create a new one
          const feedback = new Feedback({
            user: userId,
            event: eventId,
            feedbackText,
            rating
          });
          await feedback.save();
          console.log('New feedback posted successfully');
          return res.status(200).json({ message: 'New feedback posted successfully' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  
    async getFeedbacksForEvent(req, res) {
      const { eventId } = req.params;

      try {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        const feedbacks = await Feedback.find({ event: eventId }).populate('user', 'name');

        return res.status(200).json(feedbacks);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  };
}

module.exports = feedbackController;
