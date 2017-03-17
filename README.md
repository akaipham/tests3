# Vault Dragon APP

## PREREQUISITE
1. NodeJS (>=v4.4.7) 
2. Docker Engine (>=1.9) and Docker Compose (>=1.8)

### Currently, we have 2 environments: DEVELOPMENT & DEPLOYMENT

## RUN THE DEVELOPMENT ENVIRONMENT

0. Go to 2 folder: frontend and backend and follow the instruction in each folder to install the app first

1. In your terminal, run the proxy:
```
$ cd /path/to/vault-dragon && ./develop.sh
```

2. Put in your /etc/hosts:
```
127.0.0.1 db
```

3. Open a new tab in your terminal to run the frontend:
```
$ cd /path/to/vault-dragon/frontend
$ npm run dev
```

4. Open a new tab in your terminal to run the backend:
```
$ cd /path/to/vault-dragon/backend
$ npm run compile && npm start
```

The application should be running on port 5555 of your localhost

# RUN THE DEPLOYMENT ENVIRONMENT

0. Please make sure that you dont have any process (eg: mongo server) running on port 27017
How to clean a running Mongo instance on local:
```
$ mongo # access the local mongo db fisrt
$ use admin # this is needed since we need the admin permission to shutdown mongo
$ db.shutdownServer() # your server should be shutting down now. just exit from mongo client and try to run the ./develop.sh script again
``` 

1. Create a local docker registry
```
$ docker run -d --name local_registry -p 5000:5000 registry:2
```

2. Run
```
$ ./deploy.sh
```

# ACCESSING MONGODB INSIDE DOCKER

1. In the dev ENVIRONMENT
```
$ mongo mongodb://127.0.0.1:27017/VaultData
```

2. In production ENVIRONMENT
```
$ docker exec -it jdadevelopment_db_1 bash # this will bring you to the db's docker container
$ mongo # then, inside the container you just need to do this to access the db
```

# API DOC
**Title**
----
`Update Patient`

* **URL**

  `/patient`

* **Method:**

  `PUT`

* **Data Params**

  `{_id?: string;
    status?: string;
    profilePhoto?: string;
    birthday?: string;
    name: string;
    gender?: string;
    pastMediacation?: string;
    tags?: any;
    contacts?: any;
    answer?: any;
    createdAt?: Date;
    updatedAt?: Date;}`

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
`{  "_id": "58ca350a67c22610442d9a84",
    "profilePhoto": "http://dummyimage.com/101x106.jpg/cc0000/ffffff",
    "birthday": "5/20/2016",
    "name": "Helen",
    "pastMediacation": "Hbbnkmm",
    "__v": 0,
    "updatedAt": "2017-03-17T06:49:32.867Z",
    "createdAt": "2017-03-17T06:49:32.867Z",
    "answer": {
      "value": false,
      "context": ".....Alo....."
    },
    "contacts": [
      {
        "address": "Address Example",
        "postalCode": "000000",
        "email": "email@vault.com",
        "phone": "0000000000",
        "_id": "58ca350a67c22610442d9a85"
      }
    ],
    "tags": [
      "VHJkkRodgers",
      "1"
    ],
    "gender": "Female",
    "status": "open"
  }`
* **Error Response:**
    **Code:** 0 Throw <br />
    **Content:** `Invalid Interface`
* **Sample Call:**

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

----
`Fetch all Patients`

* **URL**

  `/patient-all`

* **Method:**

  `GET`

* **Data Params**

  ``

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
`[
  {
    "_id": "58ca350a67c22610442d9a84",
    "status": "open",
    "profilePhoto": "http://dummyimage.com/101x106.jpg/cc0000/ffffff",
    "birthday": "5/20/2016",
    "name": "Helen",
    "gender": "Female",
    "pastMediacation": "Hbbnkmm",
    "tags": [
      "VHJkkRodgers",
      "1"
    ],
    "contacts": [
      {
        "address": "Address Example",
        "postalCode": "000000",
        "email": "email@vault.com",
        "phone": "0000000000",
        "_id": "58ca350a67c22610442d9a85"
      }
    ],
    "answer": {
      "context": ".....Alo.....",
      "value": false
    },
    "createdAt": "2017-03-17T06:49:32.867Z",
    "updatedAt": "2017-03-17T06:49:32.867Z"
  },...
`
* **Error Response:**
    **Code:** 500 Server Interval<br />

* **Sample Call:**

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

----
`Fetch patients by keyword`

* **URL**

  `/patient-keyword`

* **Method:**

  `POST`

* **Data Params**

  ``

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
`[
  {
    "_id": "58ca350a67c22610442d9a84",
    "status": "open",
    "profilePhoto": "http://dummyimage.com/101x106.jpg/cc0000/ffffff",
    "birthday": "5/20/2016",
    "name": "Helen",
    "gender": "Female",
    "pastMediacation": "Hbbnkmm",
    "tags": [
      "VHJkkRodgers",
      "1"
    ],
    "contacts": [
      {
        "address": "Address Example",
        "postalCode": "000000",
        "email": "email@vault.com",
        "phone": "0000000000",
        "_id": "58ca350a67c22610442d9a85"
      }
    ],
    "answer": {
      "context": ".....Alo.....",
      "value": false
    },
    "createdAt": "2017-03-17T06:49:32.867Z",
    "updatedAt": "2017-03-17T06:49:32.867Z"
  },...
`
* **Error Response:**
    **Code:** 500 Server Interval<br />

* **Sample Call:**

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 


----
`Upload Profile Pic`

* **URL**

  `/upload-file`

* **Method:**

  `POST`

* **Data Params**

  `vault-file` : `[input file]`

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
`{tmpUrl: /tmp/abxyz.jpg}`
* **Error Response:**
    **Code:** 500 Server Interval<br />

* **Sample Call:**

* **Notes:**
`Filter: jpeg, jpg, png`
`limit size: 3mb`
  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
