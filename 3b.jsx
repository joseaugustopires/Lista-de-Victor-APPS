function ListaComidas() {
    const Comidas = ['Feijão', 'arroz', 'farofa', 'carne'];


    return (
        <div>
            <h2>Minhas Comidas Favoritos</h2>
            <ol>
                {Comidas.map((comida, index) => (
                    <li key={index}>{comida}</li>
                ))}
            </ol>
        </div>
    );
}


export default ListaComidas
