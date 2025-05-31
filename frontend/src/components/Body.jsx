

export default function Body({ elements }){
    return (
        <div>
            {
                elements.map((Item, index) => {
                    return <div key={index}>{Item}</div>
                })
            }
        </div>
    );
}