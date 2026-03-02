import { FaRegUser } from "react-icons/fa";
import Card from "../../components/Card";
import CardReservas from "../../components/CardReservas";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

const Reservas = () => {
    const reservas =[{
      id: 1,
      nome: "Carlos Eduardo Mendes",
      email: "email@.com",
      status: "Pendente",
      quarto: "Suíte Master 101",
      dados: "01 fev - 05 fev",
      valor: "R$ 1.500,00",
      forma: "Cartão de Crédito",
      Checkin:"01/02/2026",
      Checkout:"05/02/2026",
      Desconto:"Desconto: R$ 100,00"
    },{
          id: 2,
      nome: "Carlos Eduardo Mendes",
      email: "email@.com",
      status: "Pendente",
      quarto: "Suíte Master 101",
      dados: "01 fev - 05 fev",
      valor: "R$ 1.500,00",
      forma: "Cartão de Crédito",
      Checkin:"01/02/2026",
      Checkout:"05/02/2026",
      Desconto:"Desconto: R$ 100,00"

    },{
          id: 3,
      nome: "Carlos Eduardo Mendes",
      email: "email@.com",
      status: "Pendente",
      quarto: "Suíte Master 101",
      dados: "01 fev - 05 fev",
      valor: "R$ 1.500,00",
      forma: "Cartão de Crédito",
      Checkin:"01/02/2026",
      Checkout:"05/02/2026",
      Desconto:"Desconto: R$ 100,00"
    },{
          id: 4,
      nome: "Carlos Eduardo Mendes",
      email: "email@.com",
      status: "Pendente",
      quarto: "Suíte Master 101",
      dados: "01 fev - 05 fev",
      valor: "R$ 1.500,00",
      forma: "Cartão de Crédito",
      Checkin:"01/02/2026",
      Checkout:"05/02/2026",
      Desconto:"Desconto: R$ 100,00"
    },{
          id: 1,
      nome: "Carlos Eduardo Mendes",
      email: "email@.com",
      status: "Pendente",
      quarto: "Suíte Master 101",
      dados: "01 fev - 05 fev",
      valor: "R$ 1.500,00",
      forma: "Cartão de Crédito",
      Checkin:"01/02/2026",
      Checkout:"05/02/2026",
      Desconto:"Desconto: R$ 100,00"
    },{
          id: 1,
      nome: "Carlos Eduardo Mendes",
      email: "email@.com",
      status: "Pendente",
      quarto: "Suíte Master 101",
      dados: "01 fev - 05 fev",
      valor: "R$ 1.500,00",
      forma: "Cartão de Crédito",
      Checkin:"01/02/2026",
      Checkout:"05/02/2026",
      Desconto:"Desconto: R$ 100,00"
    }]
    return (
     <section >
 
      {
        reservas.map((r)=>( <CardReservas
            key = {r.id}
            foto={<FaRegUser className="text-neutral-500 size-6 " />}
            layout="reserva"
            email={r.email}
            nome ={r.nome}
            status = {r.status}
            quarto ={r.quarto}
            dados = {r.dados}
            valor = {r.valor}
            forma = {r.forma}
            Checkin = {r.Checkin}
            Checkout = {r.Checkout}
            Desconto = {r.Desconto}
            Detalhes = {<IoEllipsisHorizontalSharp />}
            className="flex-row-reverse"/>))
      }
   
     </section>
    );
}
 
export default Reservas;''