export async function request(){
    
    const url = 'https://api.getknit.ai/v1/router/run'

    console.log("url created")

    const headers = {
        'x-auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTA2NjYxMTI5NDEwNTk0MjY1MDUyIn0sImlhdCI6MTcwNjgzOTgwOCwiZXhwIjoxNzA3OTE5ODA4fQ.PWNnICeaxbfgXV8oyRMBvdQ0z1OZ_gKpgpBF4g62peI',
 'Content-Type': 'application/json' 
    }

    console.log("Header created")
    const data= {
        "messages": [
        {
            "role": "system",
            "content": "Imagine you are the best travel planner in the world, who has traveled all the countries and knows everything about popular places to go, hidden gems, the best time to go, cultural places, outdoor activities, romantic destinations and activities, historic locations, and museums, wildlife attractions, cuisines to try and things and places to shop."
        },
        {
            "role": "user",
            "content": "I am planning to have a {{number_of_days}}-day trip to {{destination}}. We like to visit popular locations as well as offbeat hidden gems. We prefer medium-paced travel and are interested in visiting cultural places, seeing historic monuments, relaxing on beaches, interacting with wildlife, shopping for souvenirs, and enjoying nightlife. \nPlease plan a day-wise itinerary for the trip along with places to visit and explain the reason to visit each location. Provide the output in list format with details including: \n1. Day (e.g., Day 1)\n2. Primary city for the day\n3. Up to 4 locations to be covered day-wise in the following format:\n- Location title\n- Time to spend\n- Opening hours\n- Distance from the previous location"
        }
    ],
        "model": {
        "name": "openai/gpt-3.5-turbo"
    },
        "variables": [
        {
            "name": "number_of_days",
            "value": "7"
        },
        {
            "name": "destination",
            "value": "Thailand"
        }
    ]}


   await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then((res)=>{
        console.log(res.status)
        return res.text()
    }).then((res)=>{

        console.log(res)
    })

    
}