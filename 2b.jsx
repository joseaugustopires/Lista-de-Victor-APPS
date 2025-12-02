function BoasVindas({ usuario }) {
    return <h1>Bem vindo de volta, {usuario}</h1>
}
function myApp() {
    return (<BoasVindas usuario="José Augusto Pires" />)
}
export default myApp;