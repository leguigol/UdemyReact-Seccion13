import { useState } from "react";
import { register } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup"

import {Link} from 'react-router-dom';
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { LoadingButton } from "@mui/lab";

const Register = () => {

    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");

    const {user}=useUserContext();
    useRedirectActiveUser(user,"/dashboard");
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("me diste a submit");
        try{
            // await login({email: email, password: password})
            const credentialUser=await register({email,password})
            console.log(credentialUser);
        }catch(error){
            console.log(error)
        }
    };

    const onSubmit=async({email,password},{setSubmitting, setErrors, resetForm})=>{
        try{
            // await login({email: email, password: password})
            const credentialUser=await login({email,password})
            console.log(credentialUser);
        }catch(error){
            console.log(error.code)
            if(error.code===undefined){
                return setErrors({email: "email ya registrado"})
            }
        }finally{
            setSubmitting(false)
        }
        // console.log(email,password);
    }

    const validationSchema=Yup.object().shape({
        email: Yup.string().email("email no valido").required("Email requerido"),
        password: Yup.string().trim().min(6,"Minimo 6 caracteres").required("Password requerido")
    })

    return (
        <Box sx={{mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center"}}>
            <Avatar sx={{mx: "auto", bgcolor: "#111"}}>
                <AddAPhotoIcon />
            </Avatar>
            <Typography variant="h5" component={"h1"}>Register</Typography>
            <Formik
                initialValues={{ email: "", password: ""}}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({values,handleSubmit,handleChange,errors,touched,handleBlur,isSubmitting})=>(
                        <Box onSubmit={handleSubmit} sx={{mt: 1}} component="form">
                            <TextField   
                                type="text" 
                                placeholder="email@example.com" 
                                value={values.email} 
                                onChange={handleChange} 
                                name="email" 
                                onBlur={handleBlur} 
                                id="email"
                                label="Ingrese email"
                                fullWidth
                                sx={{ mb: 3}}
                                error={errors.email && touched.email}
                                helperText={errors.email && touched.email && errors.email}
                            />
                            <TextField 
                                type="password" 
                                value={values.password} 
                                onChange={handleChange} 
                                name="password" 
                                onBlur={handleBlur}
                                id="password"
                                label="Ingrese password"
                                fullWidth
                                sx={{mb: 3}}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password && errors.password}
                            
                            />
                            {/* <input type="text" placeholder="Ingrese email" value={values.email} onChange={handleChange} name="email" onBlur={handleBlur}/>
                            {
                                errors.email && touched.email && errors.email
                            }
                            <input type="password" placeholder="Ingrese contraseña" value={values.password} onChange={handleChange} name="password" onBlur={handleBlur}/>
                            {
                                errors.password && touched.password && errors.password
                            } */}

                            <LoadingButton type="submit" disabled={isSubmitting} loading={isSubmitting} variant="contained" fullWidth sx={{mb: 3}}>Registrate</LoadingButton> 
                            <Button fullWidth component={Link} to="/">Ya tienes cuenta ? Ingresa</Button>
                        </Box>        
                    )
                }
            </Formik>

        </Box>
    )    
};

export default Register;
