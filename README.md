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

QUESTO DOVREBBE ESSERE LO STILE: 
### __Get a single question__

URL: `/api/questions/<id>`

HTTP Method: GET.

Description: Retrieve the question represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:
```
{
  "id": 1,
  "text": "Is JavaScript better than Python?",
  "email": "luigi.derussis@polito.it",
  "userId": 1,
  "date": "2025-02-07"
} 
```

