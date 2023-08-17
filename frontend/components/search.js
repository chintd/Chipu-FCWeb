import { redirect, Link} from "react-router-dom";
import "../css/home.css"
import { useCallback, useEffect, useState } from "react";
const Search = ()=>{
    const [searchData, setSearchData] = useState([])
    const fetchSearchList = useCallback(async ()=>{
        try{
            const res = await fetch("http://localhost:5000/search");
            if(!res.ok) {
                throw new Error ("cant fetch search video form backend!!!")
            };
            const data = await res.json();
            setSearchData(data)
        }catch(err){
            console.log(err)
        }
    },[])
    useEffect(()=>{
        fetchSearchList()
    },[])
    console.log(searchData, "search com loader")
    return  <ul className="item-list">
    {searchData.length >0? searchData.map(el=><li key={el.id}>
        <Link className="card" to={`/detail/${el.id}`}>
            <img src={el.imageUrl} alt=""/>
            <h4>{el.title}</h4>
            <p>{el.description}</p>
        </Link>
    </li>) : <h1>No searchData Found!!!</h1>}
</ul>
}

export default Search;
export async function action({params,request}){
    const data = await request.formData();
    const searchTerm = await data.get('search');
    console.log(searchTerm," serach action input")
    try{
        await fetch(`http://localhost:5000/search?s=${searchTerm}`,{
            headers:{
                "content-Type": "application/json"
            },
            body: JSON.stringify({term: searchTerm}),
            method: request.method
        })
    }catch(err){
        console.log(err)
    }
    return redirect(`/search?s=${searchTerm}`)
}
// export async function loader(){
//     try{
//         const res = await fetch("http://localhost:5000/search");
//         if(!res.ok) {
//             throw new Error ("cant fetch search video form backend!!!")
//         };
//         const data = await res.json();
//         return data;
//     }catch(err){
//         console.log(err)
//     }
// }