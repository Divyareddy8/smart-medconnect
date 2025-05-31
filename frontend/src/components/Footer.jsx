

export default function Footer({ elements }){
    return (
        <div>
            {
                elements.map((item, index) => {
                    return <div key = {index}>{item}</div>
                })
            }
        </div>
    );
}