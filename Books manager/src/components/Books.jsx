import useFetch from "../useFetch";

const Books =()=>{
    console.log("hello");
    
    const {data,loading,error} = useFetch("http://localhost:3000/books");
    console.log(data);
    
    return (
        <div>
            <ul>
                {
                    data?.map((movie)=>(
                        <li>{movie.title}</li>
                    ))
                }
            </ul>
        </div>
    )
}   

export default Books;