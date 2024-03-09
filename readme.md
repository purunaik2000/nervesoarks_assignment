# CAR ROOM

### Models
- User Model
```yaml
{ 
  name: {string, mandatory},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 15},
  location: {String, mandatory},
  user_info: {json},
  vehicle_info: [ObjectId, ref to solf_vehicles model],
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

- Dealership Model
```yaml
{ 
  name: {string, mandatory},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 15},
  location: {String, mandatory},
  dealership_info: {json},
  cars: [ObjectId, refs to cars model],
  deals: [ObjectId, refs to deal model],
  sold_vehicles: [ObjectId, ref to solf_vehicles model],
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

- Cars Model
```yaml
{
  type: {string, mandatory},
  name: {string, mandatory},
  model: {string, mandatory},
  car_info: {
    dealerId: {ObjectId, ref to deal dealership}
  },
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

- Sold_vehicles Model
```yaml
{
  car_id: {ObjectId, ref to cars model},
  vehicle_info: {json},
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

- Deal Model
```yaml
{
  car_id: {ObjectId, ref to cars model},
  deal_info: {json},
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

## User and Dealership APIs 
### POST /register
- Return HTTP status 201 on a succesful user creation. Also return the user document. The response should be a JSON object.
- Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object.

### POST /login
- Allow an user to login with their email and password.
- On a successful login attempt return a JWT token contatining the userId. The response should be a JSON object.
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object.

### GET /dealerships (Authenticated)
- Return all the dealers details with status code 200.

### GET /dealership/:carId (Authenticated)
- Get carId from path params.
- Get car details with carId
- Return the HTTP status 200 with dealership details  if dealership found.
- Return the HTTP status 404 if dealership not found with the carId

## Cars API
### POST /add-cars (Authenticated Dealership only)
- Get userId from token.
- Make sure the userId is a valid userId by checking the user exist in the users collection.
- Return HTTP status 201 on a succesful car creation. Also return the car document. The response should be a JSON object.
- Return HTTP status 400 for an invalid request with a response body.

### GET /get-cars (Authenticated)
- Return the HTTP status 200.
- If no documents are found then return an HTTP status 404 with a response object.

### GET /get-cars/:dealerId (Authenticated)
- Returns a car with complete details.
- Return the HTTP status 200 if any documents are found
- If no documents are found then return an HTTP status 404 with a response object

## Deal API
### POST /add-deal (Authenticated user only)
- Get carId and dealerId form req body.
- Create new deal with using dealerId and carId.
- The status will be pending
- Add dealId in dealship data in deal_list
- Response the HTTP status 201 if document created successfully
- Response the HTTP status 404 if error occurs

## User API
### POST /confirm-deal
- Get dealId from request body
- Mark deal status to done
- Add carId to user vehicle_list
- Response the HTTP status 200 if document created successfully
- Response the HTTP status 404 if error occurs