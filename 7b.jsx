import { useState } from "react";
import "./App.css";


function App() {
    const [texto, setTexto] = useState("");


    return (
        <div>
            <h2>Título: {texto.toUpperCase()}</h2>
            <input
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite algo..."
            />
        </div>
    );
}


export default App;
