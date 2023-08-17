import {  useLoaderData, Link} from "react-router-dom";
import "../css/home.css"
function Home (){
    const products = useLoaderData();
    console.log(products);
    const date = new Date();
    products.map(el=> {
        const upDateTime = new Date(el.date)
        console.log(upDateTime, "cal time")
        el.date = upDateTime;
    });
    console.log( "list years")
    return <ul className="item-list">
        {products? products.map(el=><li key={el.id}>
            <Link className="card" to={`/detail/${el.id}`}>
                <img src={el.imageUrl} alt=""/>
                <h4>{el.title}</h4>
                {date.getFullYear() - el.date.getFullYear() === 0 ?
                   ( date.getMonth() - el.date.getMonth() !==0 ?
                        <p>{date.getMonth() - el.date.getMonth()} months</p>:
                        <p>{date.getDate() - el.date.getDate()} days</p>)
                    
                    :<p>{date.getFullYear() - el.date.getFullYear()} years</p>
                }
            </Link>
        </li>) : <h1>No Products Found!!!</h1>}
    </ul>
}
export default Home;
export async function loader({req}){
    console.log("loader work")
    const res = await fetch("http://localhost:5000");
    if(!res.ok){
        throw res
    }
    const data = await res.json();
    console.log(data ," data");
    return data
}
