import { Stack, Typography } from "@mui/material";

function ViewWorkerModal({worker}){

    if (!worker) return null; 

    return (
        <Stack spacing={2}>
            <Typography variant="h5">
                Detalle del Empleado
            </Typography>

            <Typography>
                <strong>ID Empleado:</strong> {worker.id}
            </Typography>

            <Typography>
                <strong>Nombre: </strong> {worker.firstName} {worker.lastName}
            </Typography>

            <Typography>
                <strong>Fecha Nacimiento:</strong> {worker.birthDate}
            </Typography>

            <Typography>
                <strong>Departamento:</strong> {worker.department}
            </Typography>

            <Typography>
                <strong>Fecha de Ingreso:</strong> {worker.hireDate}
            </Typography>

            <Typography>
                <strong>Puesto:</strong> {worker.position}
            </Typography>
        </Stack>
    );
}

export default ViewWorkerModal;