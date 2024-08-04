import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Stack from "@mui/material/Stack";

const validationSchema = Yup.object({
  programmesName: Yup.string().required("Please fill in all fields"),
  description: Yup.string().required("Please fill in all fields"),
  price: Yup.number().required("Please fill in all fields"),
  category: Yup.string().required("Please select an option"),
});

function ProgrammesCreate() {
  const [file, setFile] = useState(null);
  const [uploadedFileURL, setUploadedFileURL] = useState(null);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const handleChangeFile = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFileURL(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmitFile = async (file) => {
    const url = "http://localhost:3000/upload";
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-contentMain-mercury">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex">
        <div className="w-1/2 p-8 bg-textMain-mirage text-white flex flex-col justify-center items-center">
          <img src="" alt="" className="w-3/4 mb-4" />
          <h1 className="text-2xl font-bold"></h1>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-xl font-semibold mb-4">
            Create programmes for the students of The Dough & Pastry Academy.
          </h2>
          <Formik
            initialValues={{
              programmesName: "",
              description: "",
              price: "",
              category: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              let fileUrl = "";
              if (file) {
                fileUrl = await handleSubmitFile(file);
              }
              const newValues = { ...values, fileUrl };
              try {
                await axios.post("http://localhost:3000/programmes", newValues);
                setAlert({
                  type: "success",
                  message: "Programmes created successfully!",
                });
                resetForm();
                setFile(null);
                setUploadedFileURL(null);
              } catch (error) {
                setAlert({
                  type: "error",
                  message: "Error creating programmes",
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <div className="mb-4 focus:outline-none focus:ring-1 focus:ring-contentHighlight-silver">
                  <TextField
                    fullWidth
                    id="programmesName"
                    name="programmesName"
                    label="Programmes Name"
                    value={values.programmesName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="programmesName"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Category</FormLabel>
                    <RadioGroup
                      aria-label="category"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Pastry & Confectionery"
                        control={<Radio />}
                        label="Pastry & Confectionery"
                      />
                      <FormControlLabel
                        value="Artisan Breads"
                        control={<Radio />}
                        label="Artisan Breads"
                      />
                      <FormControlLabel
                        value="Short Courses"
                        control={<Radio />}
                        label="Short Courses"
                      />
                      <FormControlLabel
                        value="Other Programmes"
                        control={<Radio />}
                        label="Other Programmes"
                      />
                    </RadioGroup>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </FormControl>
                </div>

                <div className="mb-4">
                  <h1>Image Upload</h1>
                  <input type="file" onChange={handleChangeFile} />
                  {uploadedFileURL && (
                    <img src={uploadedFileURL} alt="Uploaded content" />
                  )}
                  {error && (
                    <p className="text-red-600 text-sm mt-1">Error: {error}</p>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    sx={{
                      borderColor: "#C10A0A",
                      color: "#C10A0A",
                      "&:hover": {
                        backgroundColor: "#FFC2C2",
                        borderColor: "#C10A0A",
                      },
                    }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#424a55",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#1a2232",
                      },
                    }}
                  >
                    Create
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          {alert && (
            <Stack sx={{ width: "100%" }} spacing={2} mt={2}>
              <Alert
                icon={<CheckIcon fontSize="inherit" />}
                severity={alert.type}
              >
                {alert.message}
              </Alert>
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgrammesCreate;
