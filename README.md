# Frontend Coding Challenge

Hi! 👋 Thanks for considering Bigeye! We're excited you've decided to interview with us.

For this portion of your interview, you will be **live-coding a simple React app in TypeScript** which we have
already scaffolded for you. Your React app will display some data from the API server included in this repo.

## The Fake Users API

The `server/` directory contains a REST API server. This REST API server is pretty terrible. Among other problems, it:

* **Randomly fails.** When a random failure occurs, the server responds with a 500 status code and an error message.
  You can expect about 25% of your requests to fail.
* **Experiences random slow-downs.** Some responses are quite fast (~10ms), but some responses can take up to 3s.

### Running the API

Install all project dependencies by running `yarn install` at the root of the project. Then, inside the
`server/` directory, run `yarn start` to run the API server.

### API Endpoints

The API server always responds with JSON and only has two endpoints. The `server/types.ts` file contains type
definitions for the endpoint responses.

#### GET `/users` -> `User[]`

Returns a list of user profile information. Here's an example response:

```json
[
  {
    "id": 1,
    "first_name": "Orazio",
    "last_name": "Slipper",
    "email": "oslipper0@army.mil"
  },
  {
    "id": 2,
    "first_name": "Madeline",
    "last_name": "Cornbell",
    "email": "mcornbell1@mashable.com"
  }
]
```

#### Get `/users/:id/relationships/logins` -> `UserLogins`

Returns a list of user logins. Here's an example response:

```json
{
  "user_id": 1,
  "logins": [
    {
      "login_time": "2020-11-13T11:21:48Z",
      "ip_v4": "115.31.131.47"
    },
    {
      "login_time": "2020-12-25T07:23:24Z",
      "ip_v4": "61.129.200.209"
    },
    {
      "login_time": "2020-06-14T19:40:28Z",
      "ip_v4": "118.36.51.49"
    }
  ]
}
```

## Your Task

Your task is to use the API server to display a list of user profile information alongside the last (most recent)
time the user logged in.

Specifically, you should display the following information:

* User ID
* Full name
* Email address
* Last (most recent) login time
* Last (most recent) login IP address

You should also display a total count for the number of users in your list.

To save you some time, we have already created an empty Create React App project for you in the `client/`
directory.

**Do not focus on what the app looks like**. Focus on the *states* of the app and displaying the correct *information*
despite the flaky API.

## Bonus Tasks

* Use the [geoip-country](https://www.npmjs.com/package/geoip-country) package to display the country associated
  with the user's last login IP address.
* Use your favorite date library to display the login time using a "humanized" format (e.g. "a minute ago",
  "1 month ago").
* Highlight any users who haven't logged in for at least one month.
