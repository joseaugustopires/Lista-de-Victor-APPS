import React, { useState } from "react";

// Componente de Sistema de Combate
function Combate() {
    const [vida, setVida] = useState(100);
    function curar() {
        setVida((v) => Math.min(v + 10, 100));
    }
    function dano() {
        setVida((v) => Math.max(v - 15, 0));
    }
    const corBarra =
        vida > 70 ? "green"
            : vida > 30 ? "yellow"
                : "red";
    const efeitoCrítico = vida < 30 ? { boxShadow: "0 0 10px red" } : {};

    return (
        <div>
            <h2>COMBATE</h2>
            <div style={{
                width: 200,
                height: 25,
                background: corBarra,
                ...efeitoCrítico
            }}>
                {vida} HP
            </div>
            <button onClick={curar}>Curar (+10 HP)</button>
            <button onClick={dano}>Dano (-15 HP)</button>
        </div>
    );
}

// Componente de Experiência e Níveis
function Experiencia() {
    const [xp, setXp] = useState(0);
    const level = Math.floor(xp / 300) + 1;
    function ganharXP(qtd) { setXp((xp) => xp + qtd); }
    return (
        <div>
            <h2>EXPERIÊNCIA & NÍVEL</h2>
            <div>Nível: {level}</div>
            <div>
                XP: {xp}
                <div style={{
                    width: 200,
                    height: 20,
                    background: "#eee",
                    position: "relative",
                    marginTop: 5
                }}>
                    <div style={{
                        height: "100%",
                        width: `${(xp % 300) / 3}%`,
                        background: "#0a0"
                    }} />
                </div>
            </div>
            <button onClick={() => ganharXP(100)}>Completar Missão (+100XP)</button>
            <button onClick={() => ganharXP(50)}>Derrotar Inimigo (+50XP)</button>
        </div>
    )
}

// Inventário do Aventureiro
function Inventario() {
    const [aberto, setAberto] = useState(false);
    const itens = ["Espada", "Poção", "Mapa"];
    return (
        <div>
            <h2>INVENTÁRIO</h2>
            <div
                style={{
                    fontSize: 24,
                    cursor: "pointer"
                }}
                onClick={() => setAberto((v) => !v)}
            >
                {aberto ? "👜" : "🎒"}
            </div>
            {aberto && (
                <ul>
                    {itens.map(it => <li key={it}>{it}</li>)}
                </ul>
            )}
        </div>
    );
}

// Diário de Missões
function Missoes() {
    const [novaMissao, setNovaMissao] = useState("");
    const [missoes, setMissoes] = useState([]);
    function adicionar() {
        if (novaMissao) {
            setMissoes([...missoes, { nome: novaMissao, concluida: false }]);
            setNovaMissao("");
        }
    }
    function marcarConcluida(idx) {
        setMissoes(missoes.map((m, i) =>
            i === idx ? { ...m, concluida: true } : m
        ));
    }
    const missaoCompleta = missoes.filter(m => m.concluida).length;

    return (
        <div>
            <h2>DIÁRIO DE MISSÕES</h2>
            <input
                value={novaMissao}
                onChange={e => setNovaMissao(e.target.value)}
                placeholder="Adicionar missão"
            />
            <button onClick={adicionar}>Adicionar</button>
            <div>Missões completas: {missaoCompleta}</div>
            <ul>
                {missoes.map((m, i) => (
                    <li key={i}
                        style={{ textDecoration: m.concluida ? "line-through" : "none" }}>
                        {m.nome}
                        {!m.concluida && <button onClick={() => marcarConcluida(i)}>Concluir</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Gerador de Encantamentos
function Encantamento() {
    const [base, setBase] = useState("");
    const gerar = () => base
        ? base.split('').reverse().join('') + "@" + Math.floor(Math.random() * 100)
        : "";
    return (
        <div>
            <h2>ENCANTAMENTO</h2>
            <input
                value={base}
                onChange={e => setBase(e.target.value)}
                placeholder="Palavra mágica"
            />
            <div>
                Encantamento: {gerar()}
            </div>
        </div>
    );
}

// Ranking dos Heróis
function Ranking() {
    const [herois, setHerois] = useState([
        { nome: "Arthos", classe: "Guerreiro", nivel: 5, xp: 300 },
        { nome: "Lumis", classe: "Mago", nivel: 4, xp: 230 },
        { nome: "Thena", classe: "Arqueiro", nivel: 3, xp: 140 }
    ]);
    function mudarNivel(idx, nv) {
        setHerois(herois.map((h, i) => i === idx ? { ...h, nivel: nv } : h));
    }
    const heroisOrdenados = [...herois].sort((a, b) => b.nivel - a.nivel);
    return (
        <div>
            <h2>RANKING DOS HERÓIS</h2>
            <ul>
                {heroisOrdenados.map((h, idx) => (
                    <li key={h.nome}>
                        {h.nome} ({h.classe}) - Nível:
                        <input type="number" value={h.nivel}
                            onChange={e => mudarNivel(idx, Number(e.target.value))}
                            style={{ width: 40 }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Sistema de Atributos
function Atributos() {
    const [pontos, setPontos] = useState(10);
    const [atrib, setAtrib] = useState({
        força: 0, resistência: 0, inteligência: 0, sorte: 0
    });
    function ajustar(attr, delta) {
        if (delta > 0 && pontos > 0) {
            setAtrib({ ...atrib, [attr]: atrib[attr] + 1 });
            setPontos(pontos - 1);
        }
        if (delta < 0 && atrib[attr] > 0) {
            setAtrib({ ...atrib, [attr]: atrib[attr] - 1 });
            setPontos(pontos + 1);
        }
    }
    return (
        <div>
            <h2>ATRIBUTOS</h2>
            <div>Pontos: {pontos}</div>
            {Object.entries(atrib).map(([k, v]) => (
                <div key={k}>{k.toUpperCase()}: {v}
                    <button onClick={() => ajustar(k, 1)}>+</button>
                    <button onClick={() => ajustar(k, -1)}>-</button>
                </div>
            ))}
        </div>
    );
}

// Painel do Personagem
function Personagem() {
    const [nome, setNome] = useState("");
    const [raca, setRaca] = useState("Humano");
    const [classe, setClasse] = useState("Guerreiro");
    const [verStatus, setVerStatus] = useState(false);
    return (
        <div>
            <h2>{nome.toUpperCase() || "PERSONAGEM"}</h2>
            <input
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Nome"
            />
            <select value={raca} onChange={e => setRaca(e.target.value)}>
                <option>Humano</option>
                <option>Elfo</option>
                <option>Anão</option>
            </select>
            <select value={classe} onChange={e => setClasse(e.target.value)}>
                <option>Guerreiro</option>
                <option>Mago</option>
                <option>Arqueiro</option>
            </select>
            <button onClick={() => setVerStatus(s => !s)}>
                {verStatus ? "Esconder Efeitos" : "Mostrar Efeitos"}
            </button>
            {verStatus && <div>Efeitos Ativos: Nenhum</div>}
        </div>
    );
}

// Sistema Econômico
function Economia() {
    const [ouro, setOuro] = useState(50);
    const [lojaAberta, setLojaAberta] = useState(false);
    const itensLoja = [
        { nome: "Poção", preco: 15 },
        { nome: "Mapa", preco: 15 }
    ];
    function comprar(preco) {
        if (ouro >= preco) setOuro(ouro - preco);
    }
    function ganharOuro() { setOuro(ouro + 25); }
    return (
        <div>
            <h2>ECONOMIA</h2>
            <div>Ouro: {ouro}</div>
            <button onClick={ganharOuro}>Ganhar ouro (+25)</button>
            <button onClick={() => setLojaAberta(l => !l)}>
                {lojaAberta ? "Fechar Loja" : "Abrir Loja"}
            </button>
            {lojaAberta &&
                <ul>
                    {itensLoja.map(it => (
                        <li key={it.nome}>
                            {it.nome} - {it.preco} ouro
                            <button onClick={() => comprar(it.preco)}>Comprar</button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

// App principal, reúne tudo
export default function RPGApp() {
    return (
        <div style={{ fontFamily: "sans-serif", padding: 20 }}>
            <Personagem />
            <Combate />
            <Experiencia />
            <Atributos />
            <Economia />
            <Inventario />
            <Ranking />
            <Missoes />
            <Encantamento />
        </div>
    );
}
