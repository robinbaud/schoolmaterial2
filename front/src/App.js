import React from "react";
import "./App.css";
import Axios from "axios";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function App() {
  const baseUrl = process.env.REACT_APP_DOMAIN;
  const studentApi = "http://vps-a47222b1.vps.ovh.net:4242/student";
  const [studentTab, setStudentTab] = React.useState(null);

  // React.useEffect(() => {
  //   Axios.get(baseUrl + "/api/allMateriels")
  //     .then((r) => console.log(r))
  //     .catch((e) => console.error(e));
  // }, []);
  React.useEffect(() => {
    Axios.get(baseUrl + "/api/students")
      .then((r) => setStudentTab(r.data))
      .catch((e) => console.error(e));
  }, []);

  const handleClick = (id) => {
    console.log(id);
    Axios.post(baseUrl + "/api/reservationStudent", { studentid: id })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };
  return (
    <div className="App">
      <Button variant="contained" className="headerButton">
        étudiants
      </Button>
      <Button variant="contained" className="headerButton">
        réservations
      </Button>
      <div className="container">
        <div className="headerDistance">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Nom</TableCell>
                <TableCell className="tableCell">Prénom</TableCell>
                <TableCell>Mail</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <div className="scrollContainer">
            <TableContainer component={Paper}>
              <Table>
                <TableBody className="scrollable">
                  {studentTab &&
                    studentTab.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="tableCell">
                          {student.nom}
                        </TableCell>
                        <TableCell className="tableCell">
                          {student.prenom}
                        </TableCell>
                        <TableCell>{student.mail}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleClick(student.id)}
                          >
                            Réserver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
