
import { useCallback, useEffect, useState } from "react";
import "../css/detail.css"
import { Link, useLoaderData } from "react-router-dom";
function Detail (){
    const data = useLoaderData();
    const date = new Date();
    data.date = new Date(data.date);
    const [relateVideo, setRelateVideo] = useState("")
    const fetchRelateData = useCallback(async function (){
        try{
            const res = await fetch(`http://localhost:5000/`);
        if(!res.ok){
            throw res
        }
        const data = await res.json();
        data.map(el=> {
            const upDateTime = new Date(el.date)
            console.log(upDateTime, "cal time")
            el.date = upDateTime;
        });
        setRelateVideo(data);
        console.log(data, "relate vid")
        return data
        }catch(err){
            console.log(err)
        }
    },[])
    useEffect(()=>{
        fetchRelateData()
    },[])
    
    return <div className="detail">
        <div className="detail-main">
            <div className="detail-main_content">
                <img className="vid" src={data.imageUrl} alt=""/>
                <h4>{data.title}</h4>
                <div className="vid-content">
                    {date.getFullYear() - data.date.getFullYear() === 0 ?
                    ( date.getMonth() - data.date.getMonth() !==0 ?
                            <p>{date.getMonth() - data.date.getMonth()} months</p>:
                            <p>{date.getDate() - data.date.getDate()} days</p>)
                        
                        :<p>{date.getFullYear() - data.date.getFullYear()} years</p>
                    }
                    <p>{data.description}</p>

                </div>
            </div>
           
        </div>
        <div className="detail-aside">
            <ul className="detail-aside_list">
                {relateVideo.length >0 ? relateVideo.map(el=>{
                     return <li key={el.id}>
                     <Link to={`/detail/${el.id}`} className="detail-aside_card">
                     <img className="vid" src={el.imageUrl} alt=""/>
                     <div className="content">
                     <h4>{el.title}</h4>
                     {date.getFullYear() - el.date.getFullYear() === 0 ?
                   ( date.getMonth() - el.date.getMonth() !==0 ?
                        <p>{date.getMonth() - el.date.getMonth()} months</p>:
                        <p>{date.getDate() - el.date.getDate()} days</p>)
                    
                    :<p>{date.getFullYear() - el.date.getFullYear()} years</p>
                }
                     </div>
                     </Link>
                  </li>
                }) : <li>
                <Link to={`/detail/0.40874316983429204`} className="detail-aside_card">
                <img className="vid" src="" alt=""/>
                <div className="content">
                <h4>asd</h4>
                <p>asd</p>
                </div>
                </Link>
             </li>}        
            </ul>
        </div>
        <div className="comment">
                <h1>COMMENT</h1>
            </div>
    </div>
}
export default Detail;

export async function loader({req, params}){
    const id = params.detailId;
    const res = await fetch(`http://localhost:5000/detail/${id}`);
    if(!res.ok){
        throw res
    }
    const data = await res.json();
    return data
}
