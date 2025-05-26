import { Button, Container, Typography, Stack, Modal, Box } from "@mui/material";
import WorkersTable from "./components/WorkersTable";
import WorkerForm from "./components/WorkerForm";
import ViewWorkerModal from "./components/ViewWorkersModal"; 
import { useState } from "react";

function App() {
  const [openForm, setOpenForm]= useState(false);
  const [openView, setOpenView] = useState(false);  
  const [workers, setWorkers]= useState([]);
  const [viewingWorker, setViewingWorker] = useState(null);
  const [editingWorker, setEditingWorker] = useState(null);

  const handleOpenForm =() =>{
    setOpenForm(true);
    setEditingWorker(null);
  };

  const handleCloseForm =() => setOpenForm(false);

  const handleCloseView = () => {
    setViewingWorker(null);
    setOpenView(false);
  }

  const addWorker = (worker) => {
    setWorkers([...workers, {id: Date.now(), ...worker}]);
    handleCloseForm();
  }

  const updateWorker = (updatedWorker) => {
    setWorkers(
      workers.map((worker) => 
        worker.id === updatedWorker.id ? updatedWorker : worker
      )
    );
    handleCloseForm();
  };

  const deleteWorker = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  }

  const editWorker = (worker) => {
    setEditingWorker(worker);
    setOpenForm(true);
  }

  const handleOpenView = (worker) => {
    setViewingWorker(worker);
    setOpenView(true);
  }

  return (
    <Container maxWidth="md" sx={{mt:4}}>
      <Stack>
        <Typography variant="h3" align="center" gutterBottom>
          Gestión de Empleados - Institución Financiera
        </Typography>

        <Button variant="contained" color="primary" width="false" sx={{mb:3}} 
        onClick={handleOpenForm}>
          Agregar Empleado (+)
        </Button>

        <WorkersTable
          workers={workers}
          deleteWorker={deleteWorker}
          viewWorker={handleOpenView}
          editWorker={editWorker}
        />

        <Modal open={openForm} onClose={handleCloseForm}>
          <Box 
            sx={{
              position:"absolute",
              top:"50%",
              left:"50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}>
              <WorkerForm 
                handleClose={handleCloseForm}
                addWorker={addWorker}
                editingWorker={editingWorker}
                updateWorker={updateWorker}
              />
          </Box>
        </Modal>

        <Modal open={openView} onClose={handleCloseView}> 
          <Box 
            sx={{
              position:"absolute",
              top:"50%",
              left:"50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}>
              <ViewWorkerModal worker={viewingWorker}/>
          </Box>
        </Modal>
      </Stack>
    </Container>
  );
}

export default App;