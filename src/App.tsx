import { useVisibility } from './core/hooks/useVisibility';
import { useCoreService, useCoreService2 } from './core/hooks/useCoreService';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useState,useEffect } from 'react';
import { useNuiEvent } from "fivem-nui-react-lib";
import Ocorrencias from './pages/Dashboard/Ocorrencias';
import Consultas from './pages/Dashboard/Consultas';
import Multar from './pages/Dashboard/Ocorrencias/Multar';
import { Procurado } from './pages/Dashboard/Ocorrencias/Procurado';
import { Relatorio } from './pages/Dashboard/Ocorrencias/Relatorio';
import { ConsultarPlaca } from './pages/Dashboard/Consultas/ConsultarPlaca';
import { PenalCodigo } from './pages/Dashboard/Consultas/PenalCodigo';
import { Anuncios } from './pages/Dashboard/Servico/Anuncios';
import { Afazeres } from './pages/Dashboard/Servico/Afazeres';
import { SendTask } from './pages/Dashboard/Servico/SendTask';

function App() {
  useCoreService();
  useCoreService2();
  const navigate = useNavigate()
  const visibility = useVisibility()
  const [logado,setLogado] = useState<boolean>();
  useNuiEvent<boolean>("REACTNUI", "setLogado", setLogado);

  useEffect(() => {
    if (logado) {
      navigate("/dashboard")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logado])
  
 

  return (
    <div style={ visibility ? { visibility: 'visible' } : { visibility: 'hidden' }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*">
          <Route index element={<Dashboard />} /> 
          <Route path="ocorrencias/*">
            <Route path="veiculos" element={<Ocorrencias />} />
            <Route path="multar" element={<Multar />} /> 
            <Route path="procurado" element={<Procurado />} /> 
            <Route path="relatorio" element={<Relatorio />} /> 
          </Route>
          <Route path="consultas/*">
            <Route path="cidadaos" element={<Consultas />} />
            <Route path="consultar_placa" element={<ConsultarPlaca />} />
            <Route path="codigo_penal" element={<PenalCodigo />} />
          </Route>
          <Route path="servicos/*">
            <Route path="anuncios" element={<Anuncios />} />
            <Route path="afazeres" element={<Afazeres />} />
            <Route path="sendtask" element={<SendTask />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
