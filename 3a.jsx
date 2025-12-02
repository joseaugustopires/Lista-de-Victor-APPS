function ListaHobbies() {
    const hobbies = ['tocar guitarra', 'malhar', 'desenhar', 'ouvir musica'];


    return (
        <div>
            <h2>Meus Hobbies Favoritos</h2>
            <ul>
                {hobbies.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
                ))}
            </ul>
        </div>
    );
}


export default ListaHobbies