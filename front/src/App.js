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
  const [reservationsTab, setReservationsTab] = React.useState(null);
  const [reservations, setReservations] = React.useState(null);
  const [page, setPage] = React.useState(1);

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
  const changePage = (page) => {
    const result = [];
    reservations.forEach((item) => {
      studentTab.forEach((student) => {
        if (student.id == item.studentid) {
          result.push({
            id: student.id,
            nom: student.nom,
            prenom: student.prenom,
            mail: student.mail,
          });
        }
      });
    });
    setReservationsTab(result);
    setPage(page);
  };
  React.useEffect(() => {
    Axios.get(baseUrl + "/api/studentReservation")
      .then((r) => setReservations(r.data))
      .catch((e) => console.error(e));
  }, []);
  return (
    <div className="App">
      <Button
        variant={page === 1 ? "contained" : "outlined"}
        className="headerButtonOne"
        onClick={() => setPage(1)}
        style={{
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          width: 200,
        }}
      >
        étudiants
      </Button>
      <Button
        variant={page === 2 ? "contained" : "outlined"}
        className="headerButtonTwo"
        style={{
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          width: 200,
        }}
        onClick={() => changePage(2)}
      >
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
                {page && page === 1 && (
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
                )}
                {page && page == 2 && (
                  <TableBody className="scrollable">
                    {reservationsTab &&
                      reservationsTab.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="tableCell">
                            {student.nom}
                          </TableCell>
                          <TableCell className="tableCell">
                            {student.prenom}
                          </TableCell>
                          <TableCell>{student.mail}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
