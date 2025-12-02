function Saudacao({ nome }) {
    return <h1>Olá, {nome}</h1>
}
function myApp() {
    return (<Saudacao nome="José Augusto" />)
}
export default myApp;