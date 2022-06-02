# AllTrails: Find Our Lunch!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Documents

[https://docs.google.com/document/d/19DgOBnaVGM-kWkMqPU9VjegcwFrY8yZcQMEWkpRHCvo](Assignment Doc)

[https://developers.google.com/maps/documentation/javascript/places](Google Places Documentation)

[https://developers.google.com/maps/documentation/javascript/places-autocomplete](Google Places Autocomplete Documentation)

[https://www.npmjs.com/package/@react-google-maps/api](React Google Maps API library)

## Project Requirements

- [x] Allow users to search for restaurants
- [x] Render search results in a list
- [-] Render results as a pin on the map

## Nice to Have:

- [ ] Allow users to add favorites
- [ ] Render favorites in current and future search results
- [ ] A few test cases

## Would Haves

- Pagination or 'load more' button

## Could Haves

- [ ] Responsive design
- [ ] Filter for outdoor seating
- [ ] Autocomplete
- [ ] Loading state
- [ ] Error state

## Notes before coding:

- This is for lunch, so possibly hard-code search for restaurants that are currently open? Or
  provide a toggle for 'open now' or 'lunch spots only'
- Don't make your API key public 😅
- Favorites: local storage? Adding authentication feels out of scope for this type of project

## Notes during development:

- Scale: the Google Places API has request quotas and [https://developers.google.com/maps/documentation/javascript/places#UsageLimits](they recommend service APIs if batch requests are needed.)
- Default map location: user's location, if available, or AllTrails HQ: 530 Bush St #900, San Francisco
- Security: Currently, I would not deploy this app as .env files are not secure and would expose my private API key during the build process. Hosting this app in a private repo will provide security for now. If I need to deploy this, a middleware that API that I build where the google API key could be more securely stored could be one possible solution to keep the API key safe.
- The text color given in the designs are not accessible
- The card design isn't accessible as the favorite button is nested inside of a clickable card

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
