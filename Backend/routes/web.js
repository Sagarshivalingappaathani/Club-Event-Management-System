//controllers
const authController = require('../app/http/controllers/authController') 
const eventController = require('../app/http/controllers/eventController');
const userController = require('../app/http/controllers/userController')
const registrationController = require('../app/http/controllers/registrationController')
const feedbackController = require('../app/http/controllers/feedbackController'); // Import the feedback controller
const eventposter = require('../app/http/controllers/eventposter');

function initRoutes(app) {

    //authentication
    app.post('/api/login', authController().postLogin)
    app.post('/api/register', authController().postRegister)

    //events controllers
    app.get('/api/getEvents', eventController().getEvents)
    app.get('/api/getEventDetails/:eventId', eventController().getEventDetails);
    app.post('/api/createevent', eventController().createEvent)
    app.put('/api/updateEvent/:eventId', eventController().updateEvent);
    app.delete('/api/deleteEvent/:eventId', eventController().deleteEvent);
    
    app.post('/api/uploadposter', eventposter().Uploadposter);

    //users details
    app.get('/api/users', userController().getUsers)
    app.get('/api/getOrganizer/:organizerId', userController().getOrganizer);

    //registration Controller
    app.get('/api/gettotalregistration/:eventId', registrationController().getTotalRegisteredUsers)
    app.get('/api/getallregisteredeventsofuser/:userId', registrationController().getAllRegisteredEventsOfUser)
    app.post('/api/registeruser', registrationController().registerUser)
    app.delete('/api/unregisteruser', registrationController().unregisterUser)

    // Feedback Controller
    app.post('/api/postFeedback', feedbackController().postFeedback); // Route for posting feedback
    app.get('/api/getFeedbacksForEvent/:eventId', feedbackController().getFeedbacksForEvent); // Route for getting feedbacks for a particular event
}

module.exports = initRoutes;
