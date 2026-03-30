import { useState } from "react";
import { DollarSign, Wallet, CreditCard, MoreHorizontal, Search } from "lucide-react";
import Drawer from "../../components/Drawer";

const pagamentosIniciais = [
  { id: "#0001", valor: 1500, desconto: 0, tipo: "Cartão de Crédito", status: "Pago" },
  { id: "#0002", valor: 850, desconto: 50, tipo: "PIX", status: "Pago" },
  { id: "#0003", valor: 2200, desconto: 0, tipo: "Dinheiro", status: "Pendente" },
  { id: "#0004", valor: 1200, desconto: 100, tipo: "Cartão de Débito", status: "Pago" },
  { id: "#0005", valor: 3500, desconto: 200, tipo: "Transferência", status: "Pendente" }
];

export default function Pagamentos() {

  const [listaPagamentos] = useState(pagamentosIniciais);
  const [busca, setBusca] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);

  const pagamentosFiltrados = listaPagamentos.filter((p) =>
    p.id.toLowerCase().includes(busca.toLowerCase()) ||
    p.tipo.toLowerCase().includes(busca.toLowerCase()) ||
    p.status.toLowerCase().includes(busca.toLowerCase())
  );

  const totalRecebido = listaPagamentos
    .filter((p) => p.status === "Pago")
    .reduce((acc, p) => acc + (p.valor - p.desconto), 0);

  const totalPendente = listaPagamentos
    .filter((p) => p.status === "Pendente")
    .reduce((acc, p) => acc + (p.valor - p.desconto), 0);

  const abrirDetalhes = (pagamento) => {
    setPagamentoSelecionado(pagamento);
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-bold">Pagamentos</h1>
          <p className="text-gray-500">Controle financeiro das reservas </p>
        </div>

        <div className="relative w-[320px]">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Buscar pagamentos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b4263]/20"
          />

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">

          <div className="bg-green-100 p-3 rounded-lg">
            <DollarSign className="text-green-600" size={26} />
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total Recebido</p>
            <h2 className="text-green-600 text-2xl font-bold">
              R$ {totalRecebido.toLocaleString("pt-BR")}
            </h2>
          </div>

        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">

          <div className="bg-yellow-100 p-3 rounded-lg">
            <Wallet className="text-yellow-600" size={26} />
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total Pendente</p>
            <h2 className="text-yellow-600 text-2xl font-bold">
              R$ {totalPendente.toLocaleString("pt-BR")}
            </h2>
          </div>

        </div>

      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-6">

        <div className="overflow-x-auto w-full rounded-2xl">
          <div className="min-w-[900px]">

            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1.5fr_1fr_auto] gap-4 p-4 bg-[#fafafa] border-b border-gray-200 text-sm font-medium text-gray-500">
              <div>ID</div>
              <div>Valor</div>
              <div>Desconto</div>
              <div>Valor Final</div>
              <div>Tipo</div>
              <div>Status</div>
              <div></div>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">

              {pagamentosFiltrados.length > 0 ? (

                pagamentosFiltrados.map((p) => {

                  const valorFinal = p.valor - p.desconto;

                  return (
                    <div
                      key={p.id}
                      className="grid grid-cols-[1fr_1fr_1fr_1fr_1.5fr_1fr_auto] gap-4 p-4 items-center hover:bg-gray-50"
                    >

                      <div className="text-sm font-semibold text-gray-800">
                        {p.id}
                      </div>

                      <div className="text-sm text-gray-600">
                        R$ {p.valor.toLocaleString("pt-BR")}
                      </div>

                      <div className="text-sm text-gray-600">
                        {p.desconto ? `R$ ${p.desconto}` : "-"}
                      </div>

                      <div className="text-sm font-semibold text-gray-800">
                        R$ {valorFinal.toLocaleString("pt-BR")}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CreditCard size={16} />
                        {p.tipo}
                      </div>

                      <div>

                        {p.status === "Pago" ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Pago
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                            Pendente
                          </span>
                        )}

                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => abrirDetalhes(p)}
                          className="p-2 text-gray-400 hover:text-[#0b4263] hover:bg-gray-200 rounded-lg"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>

                    </div>
                  );
                })

              ) : (

                <div className="p-8 text-center text-gray-500">
                  Nenhum pagamento encontrado.
                </div>

              )}

            </div>

          </div>
        </div>

      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        titulo="Detalhes do Pagamento"
      >

        {pagamentoSelecionado && (

          <div className="bg-gray-50 p-5 rounded-xl border">

            <div className="flex items-center gap-4 border-b pb-4 mb-4">

              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>

              <div>
                <h4 className="text-lg font-bold">
                  Pagamento {pagamentoSelecionado.id}
                </h4>
                <p className="text-sm text-gray-500">
                  {pagamentoSelecionado.tipo}
                </p>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <span className="text-xs text-gray-500 uppercase">Valor</span>
                <p className="font-semibold">
                  R$ {pagamentoSelecionado.valor}
                </p>
              </div>

              <div>
                <span className="text-xs text-gray-500 uppercase">Desconto</span>
                <p className="font-semibold">
                  R$ {pagamentoSelecionado.desconto}
                </p>
              </div>

              <div>
                <span className="text-xs text-gray-500 uppercase">Valor Final</span>
                <p className="font-semibold">
                  R$ {pagamentoSelecionado.valor - pagamentoSelecionado.desconto}
                </p>
              </div>

              <div>
                <span className="text-xs text-gray-500 uppercase">Status</span>

                {pagamentoSelecionado.status === "Pago" ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Pago
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Pendente
                  </span>
                )}

              </div>

            </div>

          </div>

        )}

      </Drawer>

    </div>
  );
}