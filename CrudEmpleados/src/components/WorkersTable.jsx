import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";

const ROWS_PER_PAGE = 10;

function WorkersTable({workers, deleteWorker, viewWorker, editWorker}){

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(workers.length / ROWS_PER_PAGE);

    const startIndex = (currentPage -1 ) * ROWS_PER_PAGE; 

    const selectedWorkers = workers.slice(startIndex, startIndex + ROWS_PER_PAGE);

    const handleNextPage =() => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID Empleado</TableCell>
                            <TableCell align="center">Nombre Completo</TableCell>
                            <TableCell align="center">Departamento</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                        selectedWorkers.length === 0? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No hay empleados registrados
                                </TableCell>
                            </TableRow>
                        ):(
                        
                        selectedWorkers.map((worker) =>(
                            <TableRow key={worker.id}>
                            <TableCell>{worker.id}</TableCell>
                            <TableCell>{worker.firstName} {worker.lastName}</TableCell>
                            <TableCell>{worker.department}</TableCell>
                            <TableCell align="center">
                                <Stack direction="row" 
                                   spacing={1} 
                                   justifyContent="center">
                                    <Button variant="contained"
                                            color="info"
                                            onClick={()=> viewWorker(worker)}
                                            >
                                            Ver
                                    </Button>
                                    <Button variant="contained"
                                            color="warning"
                                            onClick={()=> editWorker(worker)}
                                            >
                                            Modificar
                                    </Button>
                                    <Button variant="contained"
                                            color="error"
                                            onClick= {() => deleteWorker(worker.id)}
                                            >
                                            Eliminar
                                    </Button>
                                </Stack>
                            </TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                </Table>
            </TableContainer>

            {
                workers.length > ROWS_PER_PAGE && (
                    <Stack direction="row"
                            spacing={2} 
                            justifyContent="center"
                            alignItems="center">
                        
                        <Button variant="outlined" 
                                onClick={handlePrevPage}
                                disabled={currentPage ===1}>
                            Anterior
                        </Button>
                        <Typography>Página {currentPage} de {totalPages} - Total de registros: {workers.length}</Typography>
                        <Button variant="outlined" 
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}>
                            Siguiente
                        </Button>
                    </Stack>
                )
            }
        </>
    );
}

export default WorkersTable;