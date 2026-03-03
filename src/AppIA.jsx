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
  Badge,
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
    nombre: "Generador de Contratos",
    folio: "DOC-002",
    introduccion: "Sistema para redactar contratos legales mediante agente IA",
    alcance: "Contratos laborales, de servicios y de confidencialidad",
    reqs_funcionales: "Plantillas dinámicas, firma electrónica, historial de versiones",
    reqs_no_funcionales: "Seguridad TLS, cumplimiento GDPR, almacenamiento cifrado",
  },
  {
    id: 3,
    nombre: "Generador de Reportes Técnicos",
    folio: "DOC-003",
    introduccion: "Automatización de reportes técnicos a partir de datos estructurados",
    alcance: "Reportes de ingeniería, auditorías y análisis de sistemas",
    reqs_funcionales: "Carga de datos CSV/JSON, generación IA, exportar Word/PDF",
    reqs_no_funcionales: "Tiempo de generación < 5s, soporte multiusuario",
  },
  {
    id: 4,
    nombre: "Asistente de Propuestas Comerciales",
    folio: "DOC-004",
    introduccion: "Agente IA que redacta propuestas de negocio personalizadas",
    alcance: "Propuestas para clientes B2B en sectores tecnología y consultoría",
    reqs_funcionales: "Perfil de cliente, tono configurable, exportar presentación",
    reqs_no_funcionales: "Disponibilidad 24/7, latencia < 3s, soporte español/inglés",
  },
  {
    id: 5,
    nombre: "Generador de Manuales de Usuario",
    folio: "DOC-005",
    introduccion: "Creación automática de manuales a partir de especificaciones de producto",
    alcance: "Manuales técnicos y de usuario para software y hardware",
    reqs_funcionales: "Ingesta de specs, generación por secciones, índice automático",
    reqs_no_funcionales: "Consistencia de estilo, soporte para imágenes, export PDF/HTML",
  },
  {
    id: 6,
    nombre: "Redactor de Políticas Internas",
    folio: "DOC-006",
    introduccion: "Agente que genera políticas y reglamentos internos para empresas",
    alcance: "Políticas de RH, seguridad informática y código de conducta",
    reqs_funcionales: "Selección de tipo de política, edición asistida, control de versiones",
    reqs_no_funcionales: "Trazabilidad de cambios, acceso por roles, respaldo automático",
  },
  {
    id: 7,
    nombre: "Generador de Casos de Prueba",
    folio: "DOC-007",
    introduccion: "IA que produce casos de prueba a partir de requerimientos de software",
    alcance: "Proyectos ágiles con metodología Scrum o Kanban",
    reqs_funcionales: "Análisis de reqs, generación de casos, exportar a Jira/Excel",
    reqs_no_funcionales: "Integración CI/CD, procesamiento < 10s, cobertura mínima 80%",
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
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].folio = dato.folio;
        arreglo[contador].introduccion = dato.introduccion;
        arreglo[contador].alcance = dato.alcance;
        arreglo[contador].reqs_funcionales = dato.reqs_funcionales;
        arreglo[contador].reqs_no_funcionales = dato.reqs_no_funcionales;
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
        {/* ── Header ── */}
        <div className="app-header">
          <div className="app-header-icon">&#129302;</div>
          <h1 className="app-header-title">Generador de Documentos IA</h1>
          <p className="app-header-subtitle">
            Gestiona proyectos de documentación generada por agentes de inteligencia artificial
          </p>
        </div>

        {/* ── Tabla principal ── */}
        <Container className="app-container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">
              {this.state.data.length} documento{this.state.data.length !== 1 ? "s" : ""} registrado{this.state.data.length !== 1 ? "s" : ""}
            </span>
            <Button color="success" onClick={() => this.mostrarModalInsertar()}>
              + Nuevo documento
            </Button>
          </div>

          <Table striped hover bordered responsive className="align-middle">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "50px" }}>#</th>
                <th>Nombre</th>
                <th>Folio</th>
                <th>Introducción</th>
                <th>Alcance</th>
                <th>Reqs. Funcionales</th>
                <th>Reqs. No Funcionales</th>
                <th style={{ width: "130px" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td className="text-center text-muted">{dato.id}</td>
                  <td className="fw-semibold">{dato.nombre}</td>
                  <td>
                    <Badge color="primary" pill>
                      {dato.folio}
                    </Badge>
                  </td>
                  <td className="text-muted small">{dato.introduccion}</td>
                  <td className="text-muted small">{dato.alcance}</td>
                  <td className="text-muted small">{dato.reqs_funcionales}</td>
                  <td className="text-muted small">{dato.reqs_no_funcionales}</td>
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
        <Modal isOpen={this.state.modalInsertar} size="lg">
          <ModalHeader className="modal-header-custom">
            <span>Nuevo Documento</span>
          </ModalHeader>
          <ModalBody>
            <div className="row g-3">
              <div className="col-md-8">
                <FormGroup>
                  <label className="form-label fw-semibold">Nombre</label>
                  <input
                    className="form-control"
                    name="nombre"
                    type="text"
                    placeholder="Nombre del proyecto"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-4">
                <FormGroup>
                  <label className="form-label fw-semibold">Folio</label>
                  <input
                    className="form-control"
                    name="folio"
                    type="text"
                    placeholder="DOC-000"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup>
                  <label className="form-label fw-semibold">Introducción</label>
                  <textarea
                    className="form-control"
                    name="introduccion"
                    rows="2"
                    placeholder="Descripción general del proyecto"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup>
                  <label className="form-label fw-semibold">Alcance</label>
                  <textarea
                    className="form-control"
                    name="alcance"
                    rows="2"
                    placeholder="Alcance del proyecto"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <label className="form-label fw-semibold">Reqs. Funcionales</label>
                  <textarea
                    className="form-control"
                    name="reqs_funcionales"
                    rows="3"
                    placeholder="Lista de requerimientos funcionales"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <label className="form-label fw-semibold">Reqs. No Funcionales</label>
                  <textarea
                    className="form-control"
                    name="reqs_no_funcionales"
                    rows="3"
                    placeholder="Lista de requerimientos no funcionales"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.insertar()}>
              Guardar documento
            </Button>
            <Button color="secondary" onClick={() => this.cerrarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* ── Modal Editar ── */}
        <Modal isOpen={this.state.modalActualizar} size="lg">
          <ModalHeader className="modal-header-custom">
            <span>Editar Documento</span>{" "}
            <Badge color="primary" pill className="ms-2">
              {this.state.form.folio}
            </Badge>
          </ModalHeader>
          <ModalBody>
            <div className="row g-3">
              <div className="col-md-8">
                <FormGroup>
                  <label className="form-label fw-semibold">Nombre</label>
                  <input
                    className="form-control"
                    name="nombre"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.nombre}
                  />
                </FormGroup>
              </div>
              <div className="col-md-4">
                <FormGroup>
                  <label className="form-label fw-semibold">Folio</label>
                  <input
                    className="form-control"
                    name="folio"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.folio}
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup>
                  <label className="form-label fw-semibold">Introducción</label>
                  <textarea
                    className="form-control"
                    name="introduccion"
                    rows="2"
                    onChange={this.handleChange}
                    value={this.state.form.introduccion}
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup>
                  <label className="form-label fw-semibold">Alcance</label>
                  <textarea
                    className="form-control"
                    name="alcance"
                    rows="2"
                    onChange={this.handleChange}
                    value={this.state.form.alcance}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <label className="form-label fw-semibold">Reqs. Funcionales</label>
                  <textarea
                    className="form-control"
                    name="reqs_funcionales"
                    rows="3"
                    onChange={this.handleChange}
                    value={this.state.form.reqs_funcionales}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <label className="form-label fw-semibold">Reqs. No Funcionales</label>
                  <textarea
                    className="form-control"
                    name="reqs_no_funcionales"
                    rows="3"
                    onChange={this.handleChange}
                    value={this.state.form.reqs_no_funcionales}
                  />
                </FormGroup>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)}>
              Guardar cambios
            </Button>
            <Button color="secondary" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
