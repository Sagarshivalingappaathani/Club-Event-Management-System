const Event = require('../../models/event');
const Register = require('../../models/registration');
const Feedback = require('../../models/feedback');


function eventController() {
  return {
    async createEvent(req, res) {
     
      const { title, description, startDate, startTime, endDate, endTime, location, organizer, mediaURL } = req.body;
      
      const event = new Event({
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
        location,
        organizer,
        mediaURL
      });
      
      try {
        await event.save();
        console.log("Event added to the database");
        return res.status(200).json({ message: "Event added to the database" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
    },

    async getEvents(req, res) {
      try {
        const events = await Event.find().populate('organizer', 'name');
        const eventsWithTotalRegistrationsAndRatings = await Promise.all(events.map(async event => {
          const totalRegistrations = await Register.countDocuments({ event: event._id });
          const feedbacks = await Feedback.find({ event: event._id }); // Fetch feedbacks for this event
          const ratings = feedbacks.map(feedback => feedback.rating); // Extract ratings from feedbacks
          const totalRatings = ratings.length > 0 ? ratings.reduce((acc, rating) => acc + rating) / ratings.length : 0; // Calculate average rating
          return { ...event.toObject(), totalRegistrations, rating: totalRatings }; // Include the average rating
        }));
        return res.status(200).json(eventsWithTotalRegistrationsAndRatings);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    
    
    async getEventDetails(req, res) {
      const { eventId } = req.params;
    
      try {
        const event = await Event.findById(eventId).populate('organizer', 'name');
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        
        const totalRegistrations = await Register.countDocuments({ event: eventId });
        const feedbacks = await Feedback.find({ event: eventId });
        const ratings = feedbacks.map(feedback => feedback.rating);
        const totalRatings = ratings.length > 0 ? ratings.reduce((acc, rating) => acc + rating) / ratings.length : 0;
    
        const eventDetails = {
          ...event.toObject(),
          totalRegistrations,
          rating: totalRatings
        };
        
        return res.status(200).json(eventDetails);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    

    async updateEvent(req, res) {
      const { eventId } = req.params;
      const { title, description, startDate, endDate, location, organizer } = req.body;

      try {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        // Update event details
        event.title = title;
        event.description = description;
        event.startDate = startDate;
        event.endDate = endDate;
        event.location = location;
        event.organizer = organizer;

        await event.save();

        console.log('Event updated successfully');
        return res.status(200).json({ message: 'Event updated successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },

    async deleteEvent(req, res) {
      const { eventId } = req.params;

      try {
        const event = await Event.findByIdAndDelete(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        console.log('Event deleted successfully');
        return res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  };
}

module.exports = eventController;


