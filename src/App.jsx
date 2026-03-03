import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const data = [
  {
    id: 1,
    nombre: "Proyecto documentos IA",
    folio: "DOC-001",
    introduccion: "Descripción general del sistema",
    alcance: "Sistema web de generación de documentos",
    reqs_funcionales: "Login, generación IA, exportar PDF",
    reqs_no_funcionales: "Disponibilidad 99%, tiempo de respuesta < 2s",
  },
  {
    id: 2,
    nombre: "Proyecto IA",
    folio: "DOC-002",
    introduccion: "Herramienta conversacional con IA",
    alcance: "Plataforma SaaS para equipos de desarrollo",
    reqs_funcionales: "Chat IA, historial, edición colaborativa",
    reqs_no_funcionales: "Escalabilidad, seguridad de datos",
  },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      folio: "",
      introduccion: "",
      alcance: "",
      reqs_funcionales: "",
      reqs_no_funcionales: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({ form: dato, modalActualizar: true });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador] = { ...dato };
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "¿Estás seguro que deseas eliminar el documento " + dato.folio + "?",
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  };

  render() {
    return (
      <>
        <Container>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            + Crear Documento
          </Button>
          <br />
          <br />
          <Table striped responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Folio</th>
                <th>Introducción</th>
                <th>Alcance</th>
                <th>Reqs. Funcionales</th>
                <th>Reqs. No Funcionales</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.folio}</td>
                  <td>{dato.introduccion}</td>
                  <td>{dato.alcance}</td>
                  <td>{dato.reqs_funcionales}</td>
                  <td>{dato.reqs_no_funcionales}</td>
                  <td>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => this.eliminar(dato)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* ── Modal Insertar ── */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <h3>Nuevo Documento</h3>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Folio:</label>
              <input
                className="form-control"
                name="folio"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Introducción:</label>
              <input
                className="form-control"
                name="introduccion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Alcance del proyecto:</label>
              <input
                className="form-control"
                name="alcance"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Requerimientos funcionales:</label>
              <input
                className="form-control"
                name="reqs_funcionales"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Requerimientos no funcionales:</label>
              <input
                className="form-control"
                name="reqs_no_funcionales"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* ── Modal Editar ── */}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <h3>Editar Documento</h3>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>Folio:</label>
              <input
                className="form-control"
                name="folio"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.folio}
              />
            </FormGroup>
            <FormGroup>
              <label>Introducción:</label>
              <input
                className="form-control"
                name="introduccion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.introduccion}
              />
            </FormGroup>
            <FormGroup>
              <label>Alcance del proyecto:</label>
              <input
                className="form-control"
                name="alcance"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.alcance}
              />
            </FormGroup>
            <FormGroup>
              <label>Requerimientos funcionales:</label>
              <input
                className="form-control"
                name="reqs_funcionales"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.reqs_funcionales}
              />
            </FormGroup>
            <FormGroup>
              <label>Requerimientos no funcionales:</label>
              <input
                className="form-control"
                name="reqs_no_funcionales"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.reqs_no_funcionales}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Guardar cambios
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
