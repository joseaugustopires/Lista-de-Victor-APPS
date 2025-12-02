function MenuRestaurante() {
    const pratos = [
        { nome: 'feijão', preco: 15.90, descricao: 'feijão caarioca no precinho' },
        { nome: 'macarrão integral', preco: 10.50, descricao: 'massa fresca e saborosa' },
        { nome: 'Lasanha Bolonhesa', preco: 28.00, descricao: 'Massa artesanal, molho de tomate e legumes' },
        { nome: 'Risotto de Camarão', preco: 38.70, descricao: 'Arroz arbóreo cremoso com camarão' }
    ];


    return (
        <div>
            <h1>Cardápio do Restaurante</h1>
            <div className="menu-grid">
                {pratos.map((prato, index) => (
                    <div key={index} className="prato-card">
                        <h3>{prato.nome}</h3>
                        <p className="preço">R$ {prato.preco.toFixed(2)}</p>
                        <p className="descricao"> {prato.descricao}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default MenuRestaurante