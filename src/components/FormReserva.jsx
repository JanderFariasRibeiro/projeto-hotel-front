import { useState } from "react";

const FormReserva = ({ formData, setFormData }) => {

  const [showFotoModal, setShowFotoModal] = useState(false);
  const [fotoTemp, setFotoTemp] = useState(formData.foto || "");

  return (
    <>
      <div className="flex flex-col gap-4">

        {/* FOTO (quadradinho do mesmo tamanho que o card usa) */}
        <div className="flex flex-col items-center gap-3">
          <div
            onClick={() => setShowFotoModal(true)}
            className="h-16 w-16 flex justify-center items-center bg-gray-300 rounded-2xl overflow-hidden cursor-pointer"
          >
            {formData.foto ? (
              <img
                src={formData.foto}
                alt="Foto"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-xs">Foto</span>
            )}
          </div>

          <p className="text-neutral-500 text-sm">Clique para alterar a foto</p>
        </div>

        {/* NOME */}
        <input
          value={formData.nome}
          onChange={(e) =>
            setFormData({ ...formData, nome: e.target.value })
          }
          placeholder="Nome completo"
          className="border p-2 rounded w-full"
        />

        {/* EMAIL */}
        <input
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="Email"
          className="border p-2 rounded w-full"
        />

        {/* QUARTO */}
        <input
          value={formData.quarto}
          onChange={(e) =>
            setFormData({ ...formData, quarto: e.target.value })
          }
          placeholder="Nome do quarto"
          className="border p-2 rounded w-full"
        />

        {/* VALOR */}
        <input
          type="number"
          value={formData.valor}
          onChange={(e) =>
            setFormData({ ...formData, valor: e.target.value })
          }
          placeholder="Valor"
          className="border p-2 rounded w-full"
        />

        {/* FORMA DE PAGAMENTO */}
        <input
          value={formData.forma}
          onChange={(e) =>
            setFormData({ ...formData, forma: e.target.value })
          }
          placeholder="Forma de pagamento"
          className="border p-2 rounded w-full"
        />

        {/* CHECK-IN */}
        <input
        
          value={formData.Checkin}
          onChange={(e) =>
            setFormData({ ...formData, Checkin: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        {/* CHECK-OUT */}
        <input
         
          value={formData.Checkout}
          onChange={(e) =>
            setFormData({ ...formData, Checkout: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        {/* STATUS */}
        <input
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
          placeholder="Status (Pago / Pendente)"
          className="border p-2 rounded w-full"
        />

        {/* DESCONTO */}
        <input
          value={formData.desconto}
          onChange={(e) =>
            setFormData({ ...formData, desconto: e.target.value })
          }
          placeholder="Desconto (opcional)"
          className="border p-2 rounded w-full"
        />

      </div>

      {/* MODAL PARA ALTERAR FOTO */}
      {showFotoModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 flex flex-col gap-4 shadow-lg">

            <h2 className="font-semibold text-lg text-neutral-800">
              Alterar foto
            </h2>

            <input
              type="text"
              placeholder="Cole a URL da foto"
              value={fotoTemp}
              onChange={(e) => setFotoTemp(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowFotoModal(false)}
                className="px-4 py-2 rounded-lg bg-neutral-200"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  setFormData({ ...formData, foto: fotoTemp });
                  setShowFotoModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-[#0b4263] text-white"
              >
                Salvar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default FormReserva;