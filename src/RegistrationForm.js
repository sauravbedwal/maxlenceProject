import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #8e9eab, #eef2f3)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        width: '30%',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        background: 'white',
    },
    input: {
        margin: theme.spacing(1, 0),
    },
    fileInput: {
        display: 'none',
    },
    uploadButton: {
        margin: theme.spacing(2, 0),
    },
    preview: {
        width: '100%',
        maxHeight: '200px',
        objectFit: 'cover',
        margin: theme.spacing(2, 0),
    },
    button: {
        margin: theme.spacing(2, 0.5),
    },
    header: {
        marginBottom: theme.spacing(3),
    },
}));

const RegistrationForm = () => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors, isDirty } } = useForm();
    const [previewData, setPreviewData] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handlePhotoUpload = (e) => {
        const uploadedPhotos = Array.from(e.target.files).slice(0, 4);
        const photoPromises = uploadedPhotos.map((photo) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve({ name: photo.name, dataURL: event.target.result });
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(photo);
            });
        });

        Promise.all(photoPromises)
            .then((uploadedPhotoInfo) => {
                const base64Photos = uploadedPhotoInfo.map((info) => info.dataURL);
                const photoNames = uploadedPhotoInfo.map((info) => info.name);

                setPreviewData((prevState) => ({
                    ...prevState,
                    photo: [...base64Photos],
                    photoNames: [...photoNames],
                }));
            })
            .catch((error) => {
                console.error("Error uploading photos:", error);
            });
    };

    return (
        <div className={classes.container}>
            {formSubmitted ? (
                <Paper elevation={3} className={classes.form}>
                    <Typography variant="h4" className={classes.header}>
                        Registration Preview
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography><strong>Email:</strong> {previewData?.email}</Typography>
                        <Typography><strong>Password:</strong> {previewData?.password}</Typography>
                    </div>
                    {previewData?.photo && (
                        <img
                            style={{ height: '250px', width: '250px' }}
                            src={previewData?.photo}
                            alt="Preview"
                            className={classes.preview}
                        />
                    )}
                    <div style={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.button}
                            onClick={() => {
                                setFormSubmitted(false);
                            }}
                        >
                            Back to Form
                        </Button>
                        <Link href="/signin" onClick={() => {
                            localStorage.setItem("email", previewData.email)
                            localStorage.setItem("password", previewData.password)
                        }}> <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.button}
                            onClick={() => {
                            }}
                        >
                                Register
                            </Button></Link>
                    </div>

                </Paper>
            ) : (
                <Paper elevation={3} className={classes.form}>
                    <Typography variant="h4" className={classes.header}>
                        Registration
                    </Typography>
                    <form onSubmit={handleSubmit((e) => {
                        console.log(e)
                        setPreviewData((prevState) => ({
                            ...prevState,
                            email: e.email,
                            password: e.password
                        }));
                        setFormSubmitted(true);
                    })}>
                        <TextField
                            onChange={(a) => {
                                setPreviewData((prevState) => ({
                                    ...prevState,
                                    email: a.target.value,
                                }));
                            }}
                            type="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            className={classes.input}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <Typography variant="caption" color="error">
                                {errors.email.message}
                            </Typography>
                        )}
                        <TextField
                            onChange={(b) => {
                                setPreviewData((prevState) => ({
                                    ...prevState,
                                    password: b.target.value,
                                }));
                            }}
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            className={classes.input}
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && (
                            <Typography variant="caption" color="error">
                                {errors.password.message}
                            </Typography>
                        )}

                        <label htmlFor="upload-input" style={{ cursor: "pointer", display: "inline-block", 
                        padding: "10px 15px", border: "1px solid #ccc", borderRadius: "5px"}}>
                            {previewData?.photoNames ? previewData.photoNames : "Click here to upload photo."}
                            <input

                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                style={{ display: "none" }}
                                id="upload-input"
                            />
                        </label>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.button}
                            type="submit"
                            disabled={!isDirty}
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            )}
        </div>
    );
};

export default RegistrationForm;
