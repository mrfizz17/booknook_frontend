import Marquee from "react-fast-marquee";

const Marquees = async() => {
    const res = await fetch("http://localhost:8000/api/categories");
    const data = await res.json();
    // console.log(data)
    return (
        <div className="bg-amber p-6 flex gap-5 mt-5 mb-10">
            <p className="font-heading text-md leading-tight font-semibold text-white">CATEGORIES</p>
            <Marquee >
            
            {data.map((item: { _id: string; title: string })=>{
                return(<p key={item._id} className="ml-10 font-heading text-md leading-tight font-semibold xl:text-base">{item.title}</p>)
            })}
        </Marquee>
        </div>
        
    );
};

export default Marquees;
