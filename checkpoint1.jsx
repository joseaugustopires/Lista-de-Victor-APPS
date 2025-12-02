import React from 'react';

const App = () => {
    // Dados extraídos da interface para manter o código limpo
    const missionData = {
        header: {
            title: "Boas vindas, Capitão José!",
            date: "Data de hoje: 29/09/2025"
        },
        missionStatus: {
            title: "Status da Missão",
            destination: "Progresso para Plutão",
            percentage: "50.0% da jornada completa"
        },
        planetInfo: {
            title: "Info do Planeta: Plutão",
            stats: [
                { label: "Temperatura", value: "-230°C ❄️" },
                { label: "Gravidade", value: "0,62 m/s² ❗" },
                { label: "Clima", value: "Muito frio ✨" }
            ],
            description: "Plutão é um planeta anão gelado e pequeno do cinturão de Kuiper, com gravidade fraca e órbita distante e excêntrica em torno do Sol."
        },
        spaceWeather: {
            title: "Previsão do Tempo Espacial",
            stats: [
                { label: "Clima", value: "Calmo 🌕" },
                { label: "Umidade Solar", value: "Alta ☢️" },
                { label: "Radiação Cósmica", value: "Média ☢️" },
                { label: "Grau Quântico", value: "100% ⚛️" }
            ]
        },
        logs: {
            title: "Relatório de Bordo (Event Log)",
            entries: [
                "1. [2025-09-01 - 08:30] Aproximação final da Nebulosa Vesper concluída. Distância: 50.000 km. Sensores de longo alcance ativados para análise preliminar da composição gasosa.",
                "2. [2025-09-15 - 15:00] Detectada anomalia nos sensores. Múltiplas leituras de energia fantasma e flutuações no campo de realidade local. Protocolo de Alta-Vigilância iniciado.",
                "3. [2025-09-28 - 19:45] O computador principal está relatando falhas em cascata no sistema de navegação. As coordenadas de retorno para a base foram corrompidas. Rota de saída comprometida."
            ]
        }
    };

    return (
        <div>
            {/* Cabeçalho */}
            <header>
                <h1>{missionData.header.title}</h1>
                <p>{missionData.header.date}</p>
            </header>

            <hr />

            {/* Seção: Status da Missão */}
            <section>
                <h2>{missionData.missionStatus.title}</h2>
                <p>{missionData.missionStatus.destination}</p>
                <p>{missionData.missionStatus.percentage}</p>
            </section>

            <br />

            {/* Seção: Info do Planeta */}
            <section>
                <h2>{missionData.planetInfo.title}</h2>
                <ul>
                    {missionData.planetInfo.stats.map((stat, index) => (
                        <li key={index}>
                            <strong>{stat.label}:</strong> {stat.value}
                        </li>
                    ))}
                </ul>
                <p>{missionData.planetInfo.description}</p>
            </section>

            <br />

            {/* Seção: Previsão do Tempo Espacial */}
            <section>
                <h2>{missionData.spaceWeather.title}</h2>
                <ul>
                    {missionData.spaceWeather.stats.map((stat, index) => (
                        <li key={index}>
                            <strong>{stat.label}:</strong> {stat.value}
                        </li>
                    ))}
                </ul>
            </section>

            <br />

            {/* Seção: Relatório de Bordo */}
            <section>
                <h2>{missionData.logs.title}</h2>
                <div>
                    {missionData.logs.entries.map((entry, index) => (
                        <p key={index}>{entry}</p>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default App;