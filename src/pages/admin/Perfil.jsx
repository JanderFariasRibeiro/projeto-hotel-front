import { useState } from "react";
import { AiOutlineEdit, AiOutlineCloudUpload } from "react-icons/ai";
import { LuUser, LuMail, LuPhone, LuBriefcase } from "react-icons/lu";
import Drawer from "../../components/Drawer";

export default function Perfil() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [nome, setNome] = useState("Ana Costa");
  const [email, setEmail] = useState("ana.costa@pousada.com");
  const [telefone, setTelefone] = useState("(85) 98765-4321");
  const [cargo, setCargo] = useState("Gerente");
  
  const [nomeForm, setNomeForm] = useState(nome);
  const [emailForm, setEmailForm] = useState(email);
  const [telefoneForm, setTelefoneForm] = useState(telefone);
  const [cargoForm, setCargoForm] = useState(cargo);

  const abrirModalEditar = () => {
    setNomeForm(nome);
    setEmailForm(email);
    setTelefoneForm(telefone);
    setCargoForm(cargo);
    setIsDrawerOpen(true);
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    setNome(nomeForm);
    setEmail(emailForm);
    setTelefone(telefoneForm);
    setCargo(cargoForm);
    setIsDrawerOpen(false);
  };

  const getIniciais = (nome) => {
    return nome.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="bg-gradient-to-r from-[#0b4263] to-[#0d5478] h-42"></div>
        
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8 pt-4">
            <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0b4263] font-bold text-4xl border-4 border-white">
              {getIniciais(nome)}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{nome}</h1>
              <p className="text-gray-500 mt-1">{cargo}</p>
            </div>

            <button
              onClick={abrirModalEditar}
              className="flex items-center gap-2 bg-[#F59F0A] hover:bg-[#d98b09] text-white font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <AiOutlineEdit size={20} /> Editar Perfil
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#0b4263] rounded-lg flex items-center justify-center text-white">
                  <LuUser size={20} />
                </div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Nome Completo</span>
              </div>
              <p className="text-lg font-medium text-gray-900 ml-13">{nome}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#0b4263] rounded-lg flex items-center justify-center text-white">
                  <LuMail size={20} />
                </div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">E-mail</span>
              </div>
              <p className="text-lg font-medium text-gray-900 ml-13">{email}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#0b4263] rounded-lg flex items-center justify-center text-white">
                  <LuPhone size={20} />
                </div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Telefone</span>
              </div>
              <p className="text-lg font-medium text-gray-900 ml-13">{telefone}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#0b4263] rounded-lg flex items-center justify-center text-white">
                  <LuBriefcase size={20} />
                </div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Cargo</span>
              </div>
              <p className="text-lg font-medium text-gray-900 ml-13">{cargo}</p>
            </div>
          </div>
        </div>
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        titulo="Editar Perfil"
      >
        <form onSubmit={handleSalvar} className="flex flex-col gap-5 h-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input 
              type="text" 
              required 
              value={nomeForm} 
              onChange={(e) => setNomeForm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input 
              type="email" 
              required 
              value={emailForm} 
              onChange={(e) => setEmailForm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input 
              type="tel" 
              required 
              value={telefoneForm} 
              onChange={(e) => setTelefoneForm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
            <input 
              type="text" 
              required 
              value={cargoForm} 
              onChange={(e) => setCargoForm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
            />
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 flex gap-3">
            <button 
              type="button" 
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 flex items-center justify-center gap-2 bg-[#F59F0A] hover:bg-[#d98b09] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer"
            >
              <AiOutlineCloudUpload size={20} /> Salvar Alterações
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
