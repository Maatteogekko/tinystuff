# Exercise 03

We have a new task for our MVP! The team wants to test a little bit of authentication by making user’s shortened URLs accessible only by themselves. They also want to test the feature of letting the users update their profile information.

This is a mock backend, so there’s no need for real authentication or a session, but we’ll simulate basic access control and profile updating.

## Requirements

1. Simulate Authentication with a Middleware.
   - Create a middleware function called authMiddleware that checks for a userId in the request headers.
   - If the userId is missing or invalid (e.g. it’s the wrong type)or it is not found in the users array, return a 401 status code with an error message.
   - If the userId is valid, attach the corresponding user to req.user (req.user = user) and proceed to the next middleware or route handler.
2. Change `GET /users/:id` to `GET /me`.
   - This route returns the profile information of the authenticated user (req.user).
   - Respond with the user object, excluding the password and limit fields.
3. Change `GET /users/:userId/urls` to `GET /urls`.
   - Returns the urls of the user of the current session.
4. `PATCH /me`
   - Allows the authenticated user to update their profile name and email.
   - Accepts a JSON body with name and email.
   - Validates the data; if either name or email is missing or is invalid, respond with a 422 status code and an error message. Both email and name must be at least 3 characters long and maximum 50. (You are not required to check that the email is a valid email).
   - Update the user’s information in the users array and respond with the updated user.
