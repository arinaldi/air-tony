# Air Tony

Build a single page app which fetches info from https://breezometer.com/api/

## Features
* Display a text input for typing in a location, ex: 'Paris, France', The app will request breezometer  API and display air quality info along with some color indicator.
* In case the API responds with an error, the app should display an appropriate message.
* Display a table showing Location and Air Quality of the last 5 searches made by the user.
* Save the state in localStorage. When the user visits the app her should see the same info as she was seeing before exiting the app.