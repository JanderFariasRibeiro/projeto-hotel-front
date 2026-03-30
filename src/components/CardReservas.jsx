import { children, useState } from "react";
import { GoCalendar } from "react-icons/go";
import { MdOutlineBed } from "react-icons/md";
import Drawer from "./Drawer";
import Card from "antd/es/card/Card";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import FormReserva from "./FormReserva";

const CardReservas = ({id,icones,cabecalho, Detalhes, Desconto, Checkout, Checkin, foto, nome, email, status, quarto, dados, valor, forma, layout, className = "",onEditar, onExcluir }) => {
  const [formData, setFormData] = useState({
  nome: "",
  email: "",
  foto: "",
  quarto: "",
  valor: "",
  forma: "",
  checkin: "",
  checkout: "",
  status: "",
  desconto: "",
  foto:""
});
  const statusNormal = status?.toLowerCase();
  const [isOpen,setIsOpen] = useState(false)
  // estado para armazenar os dados selecionados
  const [reservaSelecionada,setReservaSelecionada] = useState(null)
const [isEditOpen, setIsEditOpen] = useState(false)


  return (
    <>
    <section>
      {/* cabeçalho */}
      {
        cabecalho ==="aparecer"&&(
          <div className="flex   -mb-5 mt-4 font-medium text-neutral-400">
            <span className="w-56 text-center">Cliente</span>
            <span className="w-40  text-center" >Quarto</span>
            <span className="w-40 text-center">Check-in</span>
            <span className="w-32  text-center">Check-out</span>
            <span className="w-32  text-center">Valor</span>
            <span className="w-52  text-center">Status</span>
          </div>
        )
      }
      {/* card reservas condicional com dashboard */}
    
      <div className={`${layout === "reserva"?"  p-4 w-full flex  gap-8  ":" items-center  p-6 rounded-2xl overflow-hidden flex gap-6 hover:bg-neutral-200/55"}
      `} >

        { icones === "desaparece" || (
        <div className={` ${layout === "reserva" ? "  h-13 w-13 rounded-full" : "  h-15 w-14 "}  flex justify-center items-center  bg-gray-300 rounded-2xl`}>
          {foto}
        </div>
      )
        }

        <div className={` text-center relative  flex flex-col ${className}`}>

          {/* cards*/}
          {/* quando coloco  lg:gap-20  sm:gap-8 a estrutura do gap-8 muda todo */}
          {layout === "reserva" ? (
            <div className="flex  gap-5 items-center  ">
              <div className="flex   flex-col">
              <span className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-[170px] block">
  {nome}
</span>
                <span className="text-neutral-500 text-sm">{email}</span>
              </div>
              { icones === "desaparece" || ( 
                <div className="flex text-neutral-500 font-extraligth truncate">
                <MdOutlineBed className="text-neutral-400  relative size-5 -bottom-1 " />
                <p>{quarto}</p>
              </div>
              )
              }
              { icones ==="desaparece" ||(
                <div className="flex  text-neutral-500 font-extralight">
                <GoCalendar className="text-neutral-500 relative -bottom-1 right-1" />
                <p>{Checkin}</p>
              </div>
              )}
              { icones ==="desaparece" ||(
                <div className="flex  text-neutral-500 font-extralight">
                <GoCalendar className="text-neutral-500 relative -bottom-1 right-1" />
                <p>{Checkout}</p>
              </div>
              )
              }
                </div>
          ) : (
            <>
              <div className="flex  gap-3  ">
                <h2>{nome}</h2>
                  <span
                  className={`px-3 py-1 rounded-2xl  text-sm  ${statusNormal === "pago" ? "bg-green-200  text-green-700" : "bg-red-200 text-red-700"}`}>
                  {statusNormal === "pago" ? "Pago" : "Pendente"}
                </span>
              </div>
              <div className="flex relative gap-4 mt-1">
                <div className="flex text-neutral-500 font-extraligth">
                  <MdOutlineBed className="text-neutral-400 relative size-5 -bottom-1 right-1" />
                  <p>{quarto}</p>
                </div>
                <div className="flex text-neutral-500 font-extralight">
                  <GoCalendar className="text-neutral-500 relative -bottom-1 right-1" />
                  <p>{dados}</p>
                </div>
              </div>
            </>
          )}
         
        </div>
       
        <div className=" flex  flex-col items-end  ">
          {layout === "reserva" ? (
            // reservas
            
            <div className=" flex gap-8 items-center ">
              <div className="flex flex-col">
                <span className="font-bold ">{valor}</span>
                <span className="text-neutral-500 truncate font-light">{Desconto}</span>
              </div>
              <div>
               { icones ==="desaparece"||(

                 
                 <span className={` ${statusNormal === "pago" ? "bg-green-100/60  text-center  text-green-600 px-6 py-1 rounded-xl " : "bg-red-200/60 text-red-700 px-2 py-1 text-center rounded-xl "
                 }`}
                 >
                  {statusNormal  === "pago" ? "Pago" : "Pendente"}
                </span>
                  )
                }
              </div>
              {
                icones ==="desaparece"||(
                  // aqui ele salva os detalhes daquela reserva 
                 <div
  onClick={() => {
    setReservaSelecionada({
      id,
      foto,
      nome,
      email,
      quarto,
      valor,
      Checkin,
      Checkout,
      status,
      Desconto,
      forma
    });
    setIsOpen(true);
  }}
  className="hover:bg-orange-500 p-5  text-center rounded-2xl"
>
  {Detalhes}
</div>
                    
                  )
                }
                </div>
          ) : (
            <>
            {/* dashboard valor */}

              <div className="font-bold flex ">{valor}</div>
              <div className="text-neutral-500  flex font-light">
                {forma}
              </div>
            </>

          )}
        </div>
      </div>
    </section>
   <Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  titulo="Detalhes da Reserva"
>
  {reservaSelecionada && (
    <Card className="p-4 flex flex-col  gap-4">
      <div className="flex items-center gap-4">
        <div className=" flex justify-center items-center  h-13 w-13 rounded-full bg-gray-300 ">
          {reservaSelecionada.foto}
        </div>
        <div>
          <h2 className=" text-neutral-700 text-xl font-bold">{reservaSelecionada.nome}</h2>
          <p className="text-neutral-500 text-sm">{reservaSelecionada.email}</p>
        </div>
      </div>
        <div  className="border-b flex justify-between  border-gray-300 mb-10 pb-5 w-full"></div>
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <p className=" text-neutral-950   font-medium"><strong className="flex font-medium text-lg  text-gray-500 ">Quarto</strong> {reservaSelecionada.quarto}</p>
        <p className=" text-neutral-950   font-medium" ><strong className="flex text-gray-500 font-medium text-lg  ">Valor</strong> {reservaSelecionada.valor}</p>
        <p className=" text-neutral-950   font-medium" ><strong className="flex text-gray-500 font-medium text-lg  ">Forma</strong> {reservaSelecionada.forma}</p>
        <p className=" text-neutral-950   font-medium" ><strong className="flex text-gray-500 font-medium text-lg  ">Status</strong> {reservaSelecionada.status}</p>
        <p className=" text-neutral-950   font-medium" ><strong className="flex text-gray-500 font-medium text-lg  ">Check-in</strong> {reservaSelecionada.Checkin}</p>
        <p className=" text-neutral-950   font-medium" ><strong className="flex text-gray-500 font-medium text-lg  ">Check-out</strong> {reservaSelecionada.Checkout}</p>
        <p className=" text-neutral-950   font-medium" ><strong className="flex text-gray-500 font-medium text-lg  ">Desconto</strong> {reservaSelecionada.Desconto}</p>
      </div>
    </Card>
  )}
  <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">

  <button
    onClick={() => onExcluir(reservaSelecionada)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-xl transition-colors cursor-pointer"
  >
  <span> <AiOutlineDelete size={20}/></span> Excluir
  </button>
<button
  onClick={() => {
    setFormData({
      id: reservaSelecionada.id,
      nome: reservaSelecionada.nome,
      email: reservaSelecionada.email,
      foto: reservaSelecionada.foto,
      quarto: reservaSelecionada.quarto,
      valor: reservaSelecionada.valor,
      forma: reservaSelecionada.forma,
      checkin: reservaSelecionada.Checkin,
      checkout: reservaSelecionada.Checkout,
      status: reservaSelecionada.status,
      desconto: reservaSelecionada.Desconto,
    });

    setIsEditOpen(true); // abre o segundo Drawer (formulário)
  }}
  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#0b4263] hover:bg-[#08334d] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer"
>
  <span><AiOutlineEdit size={20} /></span>
  Editar
</button>
</div>
</Drawer>
<Drawer
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  titulo="Editar Reserva"
>
  <FormReserva formData={formData} setFormData={setFormData} />
  
  <button
    onClick={() => {
      onEditar(formData);
      setIsEditOpen(false);
      onSalvar(formData)
    }}
    className="mt-6 w-full bg-[#0b4263] hover:bg-[#08334d] text-white font-bold py-3 px-6 rounded-xl"
  >
    Salvar alterações
  </button>
</Drawer>
 
    </>
  );
}
export default CardReservas;