const Card = ({ titulo, info, children }) => {
    return (
        <section className="bg-white rounded-3xl  border border-stone-300 p-4 h-full flex flex-col">
            
            <header className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {titulo}
                </h2>
                
                <div className="text-sm text-gray-500">
                    {info}
                </div>
            </header>

            <div className="flex-1">
                {children}
            </div>
        </section>
    );
}

export default Card;