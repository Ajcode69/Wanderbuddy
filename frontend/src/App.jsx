import { useState } from 'react'


function App() {
  const [city, updateCity] = useState(" ")
  const [days,setDays]= useState(0)

  async function onsubmit(){
    await fetch('http://localhost:3000/'{
      headers:[{
        city: city,
        days:days
      }]
    }).then((res)=>{
      return res.json()
    }).then((res)=>{  

      console.log(res)
      
    })
  }

  return (
    <>
      <input type="text" name="city" id="city" onChange={(e)=>updateCity(e.target.value)}/> 
      <label htmlFor="city"> Enter the name of the city</label> 
      
      <br/>
      
      <input type="text" name="days" id="days" onChange={(e)=>days(e.target.value)}/>
      <label htmlFor="days"> No of days you plan to stay</label>

      <br/>
      
      <button id="submit" onClick={onsubmit}>Submit</button>
    </>
  )
}

export default App
