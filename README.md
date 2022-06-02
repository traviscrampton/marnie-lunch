# AllTrails: Find Our Lunch!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run this locally, clone the repo, add a `.env.development.local` file and add the following

```
REACT_APP_NOT_SECRET_GOOGLE_API_KEY={your key here}
```

Save your file, run `npm install`, and then `npm start`.

## Documents

[https://docs.google.com/document/d/19DgOBnaVGM-kWkMqPU9VjegcwFrY8yZcQMEWkpRHCvo](Assignment Doc)

[https://developers.google.com/maps/documentation/javascript/places](Google Places Documentation)

[https://developers.google.com/maps/documentation/javascript/places-autocomplete](Google Places Autocomplete Documentation)

[https://www.npmjs.com/package/@react-google-maps/api](React Google Maps API library)

## Project Requirements

- [x] Allow users to search for restaurants
- [x] Render search results in a list
- [x] Render results as a pin on the map

## Nice to Have:

- [x] Allow users to add favorites
- [ ] Render favorites in current and future search results
- [x] A few test cases

## Would Haves

- Pagination or 'load more' button
- Clicking marker highlights result item

## Could Haves

- [x] Responsive design
- [ ] Filter for outdoor seating
- [ ] Adding the functionality for setting the filters
- [ ] Autocomplete
- [ ] Loading state
- [-] Error state

## Notes before coding:

- This is for lunch, so possibly hard-code search for restaurants that are currently open? Or
  provide a toggle for 'open now' or 'lunch spots only'
- Don't make your API key public 😅
- Favorites: local storage? Adding authentication feels out of scope for this type of project

## Notes during development:

- Scale: the Google Places API has request quotas and [https://developers.google.com/maps/documentation/javascript/places#UsageLimits](they recommend service APIs if batch requests are needed.)
- Default map location: user's location, if available, or AllTrails HQ: 530 Bush St #900, San Francisco
- Security: Currently, I would not deploy this app as .env files are not secure and would expose my private API key during the build process. Hosting this app in a private repo will provide security for now. If I need to deploy this, a middleware that API that I build where the google API key could be more securely stored could be one possible solution to keep the API key safe.
- I wasn't able to use the InVision tool to inspect the design docs, they appeared as images. This greatly reduced my ability to provide pixel-perfect results
- The text color given in the designs are not accessible
- I don't think the card design isn't accessible as the favorite button is nested inside of a clickable card

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

I removed `npm build` as I don't recommend you building this if you're using env for your API key.
