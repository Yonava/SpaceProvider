# SpaceProvider

SpaceProvider is one of the two backend components of StudySpace. Its goal is to collect, store, and serve data about spaces that can be used for studying at UMass Amherst. It facilitates data collection by providing StudySpace administrators an easy interface for inputting data into the database. Serves this collected/stored data about rooms via a REST API.

### SpaceProvider uses the following technologies:
- Vue.js/TypeScript for admin frontend
- Node.js/Express.js for server/routing
- MongoDB for storing collected data on study spaces

### Current public API route(s):
- `GET /api/v1` - Get rooms from the SpaceProvider database based on query parameters
    - Query parameters:
        - `room: string` - the room to get, formatted as `${building}-${room}`
        - `_id: string` - the mongo assigned id of the room to get
        - `q: string` - search query to match against all rooms
        - `lat: number` - latitude for sorting queried rooms by distance
        - `lon: number` - longitude for sorting queried rooms by distance
        - `limit: number = 20` - pagination option to set the max number of results per page. Default is 20
        - `page: number = 1` - pagination option to get a specific page of results. One indexed. Default is 1

## About StudySpace:
StudySpace is a progressive web app (PWA) that allows UMass students and faculty to locate nearby buildings and rooms to study in. Users can choose rooms based on images, proximity to their location, and distinct features of a given room. 

## Explore StudySpace's other components:
### [SpaceFace](https://github.com/NickW777/SpaceFace)
The "face" of StudySpace; serves as the frontend/client.
### [BlockMap](https://github.com/emmethamell/BlockMap)
The other of the two backend components of StudySpace. Serves the frontend data concerning room availability via a REST API.
