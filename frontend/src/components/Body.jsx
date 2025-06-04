

export default function Body({ heading = "", elements }){
    return (
        <div>
            <h2>{heading}</h2>
            {
                elements.map((Item, index) => {
                    return <div key={index}>{Item}</div>
                })
            }
        </div>
    );
}