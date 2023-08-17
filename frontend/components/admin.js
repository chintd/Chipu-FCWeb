import "../css/admin.css";
import { Form, redirect } from "react-router-dom";
import VideoInput from "./videoInput";
function Admin(){
    return (
        <div className="App">
          <h1>Video upload</h1>
          <VideoInput width={400} height={300} />
        </div>
      );
    return<Form action="/admin" method="POST">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name='title'></input>
        <label htmlFor="img">Image URL</label>
        <input type="text" id="img" name='img'></input>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name='price'></input>
        <label htmlFor="des">Description</label>
        <textarea type="text" id="des" name='des' rows="5"></textarea>
        <button type="submit">Add Product</button>
    </Form>
}
export default Admin;

export async function action({params, request}){
    console.log(request,"action work");
    const data = await request.formData()
    const title = await data.get("title");
    const price =await data.get("price");
    const des =await data.get("des")
    const img =await data.get("img");
    console.log(title,img,price,des)
    const res = await fetch("http://localhost:5000/admin",{
        headers:{
            "content-Type": "application/json"
        },
        method: request.method,
        body: JSON.stringify({product: {
            title: title,
            imageUrl: img,
            price: price,
            description :des
        }})
    })
    if(!res.ok){
        throw res
    }
    return redirect("/")
}
