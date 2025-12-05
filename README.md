# README

## DB Entities

### Medicine
- name
- assumption_modality
- medicine_type (pill, sachet, drop)
- description 

### Plan (weekly)
- creation_date
- time_slots
- motivations

### Comprehend (Plan-Medicine)
- id_medicine
- id_plan
- assumption_day
- assumption_time



## API

### **Get a the medicines of a plan**

URL: `/api/plans/<id>/medicines`

HTTP Method: GET.

Description: Retrieve all the medicines involved in the plan represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:
```json
[
  {
    "id": 1,
    "name": "Tachipirina",
    "description": "medicine for the headache",
    "assumption_modality": "?",
    "medicine_type": "pill",
    "assumption_day": "Monday",
    "assumption_time": "8:30"
  },

  {
    "id": 1,
    "name": "Tachipirina",
    "description": "medicine for the headache",
    "assumption_modality": "?",
    "medicine_type": "pill",
    "assumption_day": "Friday",
    "assumption_time": "9:30"
  },

  ...

]
```

