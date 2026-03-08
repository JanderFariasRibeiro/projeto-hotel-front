import { useState } from "react";
import { FiAlertTriangle, FiBriefcase, FiMail, FiPhone } from "react-icons/fi";
import { AiOutlineCloudUpload, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ActionBar from "../../components/ActionBar";
import Drawer from "../../components/Drawer";

const STORAGE_KEY = "funcionarios";

const carregarFuncionarios = () => {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : [];
  } catch {
    return [];
  }
};


const persistirFuncionarios = (lista) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
};

export default function Funcionarios() {
  const [listaFuncionarios, setListaFuncionarios] = useState(carregarFuncionarios);
  const [busca, setBusca] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modoDrawer, setModoDrawer] = useState("CRIAR");
  const [erroForm, setErroForm] = useState("");
  const [idEditando, setIdEditando] = useState(null);
  const [nomeForm, setNomeForm] = useState("");
  const [cargoForm, setCargoForm] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [telefoneForm, setTelefoneForm] = useState("");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [funcionarioParaDeletar, setFuncionarioParaDeletar] = useState(null);

  
  const atualizarLista = (novaLista) => {
    setListaFuncionarios(novaLista);
    persistirFuncionarios(novaLista);
  };

  const getIniciais = (nome) => {
    const pedacos = nome.trim().split(" ");
    if (pedacos.length >= 2) return (pedacos[0][0] + pedacos[1][0]).toUpperCase();
    return nome.substring(0, 2).toUpperCase();
  };

  const abrirGavetaNovo = () => {
    setModoDrawer("CRIAR");
    setIdEditando(null);
    setNomeForm(""); setCargoForm(""); setEmailForm(""); setTelefoneForm("");
    setErroForm("");
    setIsDrawerOpen(true);
  };

  const abrirGavetaDetalhes = (funcionario) => {
    setModoDrawer("VISUALIZAR");
    setIdEditando(funcionario.id);
    setNomeForm(funcionario.nome);
    setCargoForm(funcionario.cargo);
    setEmailForm(funcionario.email);
    setTelefoneForm(funcionario.telefone);
    setErroForm("");
    setIsDrawerOpen(true);
  };

  const cancelarEdicao = () => {
    const original = listaFuncionarios.find(f => f.id === idEditando);
    setNomeForm(original.nome); setCargoForm(original.cargo);
    setEmailForm(original.email); setTelefoneForm(original.telefone);
    setErroForm("");
    setModoDrawer("VISUALIZAR");
  };

  const handleSalvarGaveta = (e) => {
    e.preventDefault();
    setErroForm("");

    const emailExiste = listaFuncionarios.some((f) => {
      if (modoDrawer === "EDITAR" && f.id === idEditando) return false;
      return f.email === emailForm.trim();
    });

    if (emailExiste) {
      setErroForm("Já existe um funcionário cadastrado com este e-mail.");
      return;
    }

    const dadosFuncionario = {
      id: modoDrawer === "CRIAR" ? Date.now() : idEditando,
      nome: nomeForm.trim(),
      cargo: cargoForm.trim(),
      email: emailForm.trim(),
      telefone: telefoneForm.trim(),
    };

    if (modoDrawer === "CRIAR") {
      atualizarLista([...listaFuncionarios, dadosFuncionario]);
    } else {
      atualizarLista(listaFuncionarios.map(f => f.id === idEditando ? dadosFuncionario : f));
    }

    setIsDrawerOpen(false);
  };

  const abrirModalDeletar = () => {
    setFuncionarioParaDeletar(listaFuncionarios.find(f => f.id === idEditando));
    setIsModalDeleteOpen(true);
  };

  const confirmarExclusao = () => {
    atualizarLista(listaFuncionarios.filter(f => f.id !== funcionarioParaDeletar.id));
    setIsModalDeleteOpen(false);
    setIsDrawerOpen(false);
  };

  const funcionariosFiltrados = listaFuncionarios.filter((f) =>
    f.nome.toLowerCase().includes(busca.toLowerCase()) ||
    f.cargo.toLowerCase().includes(busca.toLowerCase()) ||
    f.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="w-full relative">

      <ActionBar
        placeholderBusca="Buscar funcionários..."
        textoBotao="Novo Funcionário"
        onBuscar={setBusca}
        onAdicionar={abrirGavetaNovo}
      />

      {funcionariosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          {funcionariosFiltrados.map((funcionario) => (
            <div
              key={funcionario.id}
              onClick={() => abrirGavetaDetalhes(funcionario)}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-5 hover:shadow-md hover:border-[#0b4263]/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#0b4263] text-white flex items-center justify-center font-bold text-base shrink-0">
                  {getIniciais(funcionario.nome)}
                </div>
                <div className="truncate">
                  <p className="text-lg font-bold text-gray-900 truncate">{funcionario.nome}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <FiBriefcase size={13} className="text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-500 truncate">{funcionario.cargo}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div className="flex flex-col gap-2.5 text-sm text-gray-600">
                <div className="flex items-center gap-2.5 truncate">
                  <FiMail size={15} className="text-gray-400 shrink-0" />
                  <span className="truncate">{funcionario.email}</span>
                </div>
                <div className="flex items-center gap-2.5 truncate">
                  <FiPhone size={15} className="text-gray-400 shrink-0" />
                  <span className="truncate">{funcionario.telefone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center text-gray-500 mb-6">
          Nenhum funcionário encontrado.
        </div>
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        titulo={
          modoDrawer === "CRIAR" ? "Adicionar Novo Funcionário" :
          modoDrawer === "VISUALIZAR" ? "Detalhes do Funcionário" : "Editar Funcionário"
        }
      >
        <div className="flex flex-col h-full">

          {modoDrawer === "VISUALIZAR" ? (
            <div className="flex flex-col gap-6 h-full">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col gap-5">

                <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0b4263] flex items-center justify-center font-bold text-xl shrink-0">
                    {getIniciais(nomeForm)}
                  </div>
                  <div className="truncate">
                    <h4 className="text-xl font-bold text-[#0b4263] truncate">{nomeForm}</h4>
                    <p className="text-sm text-gray-500 truncate">{cargoForm}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cargo</span>
                    <p className="text-gray-800 font-medium mt-1 truncate">{cargoForm}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Telefone</span>
                    <p className="text-gray-800 font-medium mt-1 truncate">{telefoneForm}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">E-mail</span>
                    <p className="text-gray-800 font-medium mt-1 truncate">{emailForm}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={abrirModalDeletar}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-xl transition-colors cursor-pointer"
                >
                  <AiOutlineDelete size={20} /> Excluir
                </button>
                <button
                  onClick={() => setModoDrawer("EDITAR")}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#0b4263] hover:bg-[#08334d] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer"
                >
                  <AiOutlineEdit size={20} /> Editar Dados
                </button>
              </div>
            </div>

          ) : (

            <form onSubmit={handleSalvarGaveta} className="flex flex-col gap-5 h-full">

              {erroForm && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <FiAlertTriangle size={16} className="shrink-0" />
                  <span>{erroForm}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text" required value={nomeForm} onChange={(e) => setNomeForm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input
                  type="text" required value={cargoForm} onChange={(e) => setCargoForm(e.target.value)}
                  placeholder="Ex: Recepcionista"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email" required value={emailForm} onChange={(e) => { setEmailForm(e.target.value); setErroForm(""); }}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="text" required value={telefoneForm} onChange={(e) => setTelefoneForm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                  />
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                {modoDrawer === "EDITAR" ? (
                  <button
                    type="button" onClick={cancelarEdicao}
                    className="w-full sm:w-auto px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                ) : <div className="hidden sm:block"></div>}

                <button type="submit" className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#F59F0A] hover:bg-[#d98b09] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer">
                  {modoDrawer === "CRIAR" ? "Salvar Funcionário" : <><AiOutlineCloudUpload size={20} /> Salvar Alterações</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </Drawer>

      {isModalDeleteOpen && funcionarioParaDeletar && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center transform scale-100 animate-fade-in-up">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <FiAlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excluir Funcionário?</h3>
            <p className="text-gray-500 mb-6">
              Você está prestes a deletar <strong className="text-gray-800">{funcionarioParaDeletar.nome}</strong>. Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalDeleteOpen(false)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarExclusao}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors shadow-md shadow-red-500/20 cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}