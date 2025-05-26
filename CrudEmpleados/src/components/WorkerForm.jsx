import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const departments = [
    {value: "Finanzas", label: "Finanzas"},
    {value: "Recursos Humanos", label: "Recursos Humanos"},
    {value: "Tecnología", label: "Tecnología"},
    {value: "Operaciones", label: "Operaciones"},
    {value: "Marketing", label: "Marketing"}
];

const positions = {
    "Finanzas": ["Analista Financiero", "Gerente de Finanzas", "Contador"],
    "Recursos Humanos": ["Especialista de RH", "Reclutador", "Gerente de RH"],
    "Tecnología": ["Desarrollador", "Arquitecto de Software", "Gerente de TI"],
    "Operaciones": ["Coordinador Operativo", "Gerente de Operaciones", "Especialista"],
    "Marketing": ["Especialista de Marketing", "Diseñador", "Gerente de Marketing"]
};

function WorkerForm({handleClose, addWorker, editingWorker, updateWorker}){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate]= useState("");
    const [department, setDepartment]=useState("");
    const [hireDate, setHireDate] = useState("");
    const [position, setPosition] = useState("");

    useEffect(()=>{
        if (editingWorker){
            setFirstName(editingWorker.firstName);
            setLastName(editingWorker.lastName);
            setBirthDate(editingWorker.birthDate);
            setDepartment(editingWorker.department);
            setHireDate(editingWorker.hireDate);
            setPosition(editingWorker.position);
        } else{
            setFirstName("");
            setLastName("");
            setBirthDate("");
            setDepartment("");
            setHireDate("");
            setPosition("");
        }
    }, [editingWorker]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim() || !birthDate || !department || !hireDate || !position)
            return;

        const workerData = {firstName, lastName, birthDate, department, hireDate, position};

        if (editingWorker){
            updateWorker({...editingWorker, ...workerData})
        }else {
            addWorker(workerData);
        }
    }

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
        setPosition("");
    }

    return (
        <Box component ="form" onSubmit={handleSubmit} sx={{display:"flex", flexDirection:"column", gap:2}}>
    
            <TextField
            label = "Nombres"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            required
            />

            <TextField
            label = "Apellidos"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            required
            />

            <TextField
            type ="date"
            InputLabelProps={{shrink:true}}
            label = "Fecha de nacimiento"
            value={birthDate}
            onChange={(e)=>setBirthDate(e.target.value)}
            required
            />

            <TextField
            select
            label = "Departamento"
            value={department}
            onChange={handleDepartmentChange}
            required>
                {departments.map((option)=>(
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
            type ="date"
            InputLabelProps={{shrink:true}}
            label = "Fecha de ingreso"
            value={hireDate}
            onChange={(e)=>setHireDate(e.target.value)}
            required
            />

            <TextField
            select
            label = "Puesto"
            value={position}
            onChange={(e)=>setPosition(e.target.value)}
            disabled={!department}
            required>
                {department && positions[department].map((pos)=>(
                    <MenuItem key={pos} value={pos}>
                        {pos}
                    </MenuItem>
                ))}
            </TextField>

            <Stack direction="row" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
                {editingWorker ? "Actualizar": "Agregar"}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
                Cancelar
            </Button>
            </Stack>

        </Box>
    );
}

export default WorkerForm;