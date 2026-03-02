import { GoCalendar } from "react-icons/go";
import { MdOutlineBed } from "react-icons/md";

const CardReservas = ({ Detalhes, Desconto, Checkout, Checkin, foto, nome, email, status, quarto, dados, valor, forma, layout, className = "" }) => {
  return (
    <section className=" overflow-y-auto bg-white  border border-stone-200 ml-6 mr-6 ">
      <div className="hover:bg-neutral-200/55
        items-center  p-6 rounded-2xl  flex gap-6 ">
        <div className={` ${layout === "reserva" ? "  h-13 w-13 rounded-full" : "  h-15 w-14 "}  flex justify-center items-center  bg-gray-300 rounded-2xl`}>
          {foto}
        </div>
        <div className={`relative flex  flex-col ${className}`}>

          {/* NOME + STATUS */}
          {layout === "reserva" ? (
            <div className="flex items-center gap-5">
              <div className="flex flex-col">
                <span className="font-semibold">{nome}</span>
                <span className="text-neutral-500 text-sm">{email}</span>
              </div>
              <div className="flex text-neutral-500 font-extraligth">
                <MdOutlineBed className="text-neutral-400 relative size-5 -bottom-1 right-1" />
                <p>{quarto}</p>
              </div>
              <div className="flex text-neutral-500 font-extralight">
                <GoCalendar className="text-neutral-500 relative -bottom-1 right-1" />
                <p>{Checkin}</p>
              </div>
              <div className="flex text-neutral-500 font-extralight">
                <GoCalendar className="text-neutral-500 relative -bottom-1 right-1" />
                <p>{Checkout}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex  items-center gap-3">
                <h2>{nome}</h2>
                <span
                  className={`px-3 py-1 rounded-2xl text-sm  ${status === "pago" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                  {status === "pago" ? "pago" : "pendente"}
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
        <div className="ml-auto flex flex-col items-end gap-1">
          {layout === "reserva" ? (
            <div className=" flex gap-6 items-center">
              <div className="flex flex-col">
                <span className="font-bold">{valor}</span>
                <span className="text-neutral-500 font-light">{Desconto}</span>
              </div>
              <div>

                <span className={` ${status === "pago" ? "bg-green-100/60 px-2 py-1 text-center  text-green-600 rounded-xl " : "bg-red-200/60 text-red-700 px-2 py-1 text-center rounded-xl "
                  }`}
                >
                  {status === "Pago" ? "Pago" : "Pendente"}
                </span>
              </div>
              <div className="">
                <div className="hover:bg-orange-500 p-5 text-center rounded-2xl">{Detalhes}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="font-bold flex justify-end">{valor}</div>

              <div className="text-neutral-500 flex justify-end font-light">
                {forma}
              </div>
            </>

          )}
        </div>
      </div>
    </section>
  );
}

export default CardReservas;