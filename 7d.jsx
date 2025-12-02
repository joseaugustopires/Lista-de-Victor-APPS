import { useState } from "react";
import "./App.css";


function App() {
    const [texto, setTexto] = useState("");


    return (
        <div>
            <h2>{texto}</h2>
            <p>{texto.length}/50</p>


            <input
                type="text"
                value={texto}
                onChange={(e) =>
                    e.target.value.length <= 50
                        ? setTexto(e.target.value)
                        : "O texto possui mais do que 50 caracteres"
                }
                placeholder="Digite algo..."
            />
        </div>
    );
}


export default App;