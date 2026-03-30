import { FaRegUser } from "react-icons/fa";
import CardReservas from "../../components/CardReservas";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import Card from "../../components/Card";
import ActionBar from "../../components/ActionBar";
import { useState } from "react";


const Reservas = () => {
  const [buscar,setBusca] = useState("");
  const [filtroSelecionado,setFiltroSelecionado] = useState("TODOS");
    const [reservas, setReservas] = useState([
  {
    id: 1,
    nome: "Carlos Eduardo Mendes",
    email: "email@.com",
    status: "pago",
    quarto: "Suíte Master 101",
    dados: "01 fev - 05 fev",
    valor:"",
    forma: "Cartão de Crédito",
    Checkin:"01/02/2026",
    Checkout:"05/02/2026",
    Desconto:"Desconto: R$ 100,00"
  },{
          id: 2,
      nome: "maria de souza menezes",
      email: "email@.com",
      status: "pendente",
      quarto: "Suíte Master 101",
      dados: "01 fev - 05 fev",
      valor:"",
      forma: "Cartão de Crédito",
      Checkin:"01/02/2026",
      Checkout:"05/02/2026",
      Desconto:"Desconto: R$ 100,00"

    },{
          id: 3,
      nome: "karolaine duarte cunha",
      email: "email@.com",
      status: "pendente",
      quarto: "Suíte Master 101",
      dados: "01 fev - 05 fev",
      valor:"",
      forma: "Cartão de Crédito",
      Checkin:"01/02/2026",
      Checkout:"05/02/2026",
      Desconto:"Desconto: R$ 100,00"

    },{
          id: 4,
      nome: "janaina santos albuquerque",
      email: "email@.com",
      status: "pago",
      quarto: "Suíte Master 101",
      dados: "01 fev - 05 fev",
      valor: "",
      forma: "Cartão de Crédito",
      Checkin:"01/02/2026",
      Checkout:"05/02/2026",
      Desconto:"Desconto: R$ 100,00" }]);
      const onEditar = (dadosAtualizados) => {
  setReservas(prev =>
    prev.map(r =>
      r.id === dadosAtualizados.id ? { ...r, ...dadosAtualizados } : r
    )
  );
};
    const reservasFiltradas = reservas.filter((r) => {
  const nomeOK = r.nome.toLowerCase().includes(buscar.toLowerCase());
  const statusOK =
    filtroSelecionado === "TODOS" ||
    r.status.toLowerCase() === filtroSelecionado.toLowerCase();
  return nomeOK && statusOK;
});
    return (
      <>
     <section  className="border-b flex justify-between  border-gray-300 mb-10 pb-5 w-screen">
      <div>
     <h1 className="font-medium text-2xl text-neutral-800 ">Reservas</h1>
     <h3 className="text-neutral-500">Gerenciar todas as reservas do estabelecimento</h3>
      </div>
      <div>
            <ActionBar
            className="ml-24"
  placeholderBusca="Buscar Hóspede..."
  onBuscar={setBusca}
  filtroSelecionado={filtroSelecionado}
  setFiltroSelecionado={setFiltroSelecionado}
  opcoesFiltro={[
    { label: "Pagos", value: "pago" },
    { label: "Pendentes", value: "pendente" }
  ]}
  
/>
      </div>
      <div>
        
      </div>
      
     </section>
        <ActionBar
            className="ml-24"
  placeholderBusca="Buscar Hóspede..."
  onBuscar={setBusca}
  filtroSelecionado={filtroSelecionado}
  textoBotao="Nova Reserva"
/>
      <section className="overflow-hidden border rounded-3xl border-stone-300   divide-y divide-stone-300 ">
      <div className=" overflow-hidden  bg-neutral-200/45  ">

       <CardReservas
         layout="reserva"
         icones="desaparece"
         cabecalho="aparecer"
         
         />

         </div>
      {
        reservasFiltradas.map((r)=>( 
          <CardReservas
          key = {r.id}
          id={r.id}
          foto={<FaRegUser className="text-neutral-500 " />}
            layout="reserva"
            email={r.email}
            nome ={r.nome}
            status = {r.status}
            quarto ={r.quarto}
            dados = {r.dados}
            valor={Number(r.valor).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
})}
            forma = {r.forma}
            Checkin = {r.Checkin}
            Checkout = {r.Checkout}
            Desconto = {r.Desconto}
            Detalhes = {<IoEllipsisHorizontalSharp />}
            onEditar={onEditar}
            className="flex-row-reverse"/>))
      }
      
   
   </section>
        
      </>
    
    );
}
 
export default Reservas;