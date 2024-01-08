import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import {useNavigate,Link} from 'react-router-dom';
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup"
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { LoadingButton } from "@mui/lab";

const Login = () => {

    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate()
    const {user}=useUserContext();

    useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
    },[user])

    // const handleSubmit=async(e)=>{
    //     e.preventDefault();
    //     console.log("me diste a submit");
    // };

    const onSubmit=async({email,password},{setSubmitting, setErrors, resetForm})=>{
        try{
            // await login({email: email, password: password})
            const credentialUser=await login({email,password})
            console.log(credentialUser);
        }catch(error){
            console.log(error.code)
            if(error.code==='auth/invalid-login-credentials'){
                return setErrors({email: "Credenciales invalidas"})
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
            <Typography variant="h5" component={"h1"}>Login</Typography>
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

                            <LoadingButton type="submit" disabled={isSubmitting} loading={isSubmitting} variant="contained" fullWidth sx={{mb: 3}}>Acceder</LoadingButton> 
                            <Button fullWidth component={Link} to="/register">No tienes cuenta ? Registrate</Button>
                        </Box>        
                    )
                }
            </Formik>
        </Box>
    )    
};

export default Login;
