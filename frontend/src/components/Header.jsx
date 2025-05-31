
export default function Header({title, options, RightSide}){
    return (
        <div>
            <h1>{title}</h1>
            <ul>
                {
                    options.map((item, index) => (
                    <li key={item.key}><a href= {item.href}><button>{item.key}</button></a></li>
                    ))
                }
            </ul>
            <RightSide />
        </div>
    );
}