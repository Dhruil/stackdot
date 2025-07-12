import { useEffect } from "react"


const fetchdata = ()=>{
 
    useEffect(()=>{
        stackdot();
    },[])

    const stackdot = async() =>{
        try{
            const data = await fetch("https://jsonplaceholder.typicode.com/users");

            const apiData= await data.json();
            return apiData
            console.log(apiData)
        }
        catch (err){
console.log(err);
        }
    }

}

export default fetchdata;