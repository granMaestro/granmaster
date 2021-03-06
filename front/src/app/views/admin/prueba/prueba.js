import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link}            from 'react-router-dom'; 
import Validation    from 'react-validation';
import validator     from 'validator';
import axios from 'axios';
import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, Modal, Button} from "react-bootstrap";

 


export default class Prueba extends Component {
  constructor(props){
    super(props);
    this.state ={
      exitoso: false,
      fallo : false,
      file: '',imagePreviewUrl: '',
      dataPrueba:[]
    }  
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({dataPrueba:nextProps.dataPrueba})
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO LAS PRUEBAS, EN MEDIO DE UNA TABLA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderPruebas(){
    return this.state.dataPrueba.map((index, key)=>{
      let background = 'public/uploads/prueba/'+index._id+'.'+index.imagen;
      return(
        <Col md={4} key={key}>
          <Link to={"pregunta/?pruebaId="+index._id}>
            <span style={{background:"url('"+background+"')"}}></span>
            <h2>{index.name}</h2>
            <p>{index.descripcion}</p>
          </Link>  
        </Col>
      )
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDEREIZO EL PREVIEW DE LA IMAGEN CUANDO SE CARGA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderImagenPreview(){
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
      if (imagePreviewUrl) {
    $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
    $imagePreview = (<div className="previewText"> </div>);
    }
    return(
      <div className="imgPreview">
        {$imagePreview}
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO TODO LA PAGINA / LLAMO LOS ELEMENTOS DESDE LAS OTRAS FUNCIONES
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render(){
    return(
      <Grid className="formulario">
        <Row>
          <form  onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data" id="formulario">
            <label htmlFor="nombre">Insertar </label>
            <input type="text" id="nombre" placeholder=""></input>
            <label htmlFor="descripcion">Descripcion </label>
            <input type="text" id="descripcion" placeholder=""></input>
            <label htmlFor="descripcion"></label>
            <input type="file" id="files" name="files" onChange={(e)=>this.handleImageChange(e)} />
            <button type="submit" className="btn-site">Guardar </button>
          </form>
          <div className={this.state.exitoso ? '' : 'esconder' } > SE CREO LA CATEGORIA EXITOSAMENTE </div>
          <div className={this.state.fallo ? '' : 'esconder' } > NO SE PUDO CREAR LA CATEGORIA</div>
          {this.renderImagenPreview()}
        </Row> 
        <Row className="listado-pruebas"> 
        {this.renderPruebas()}
        </Row> 
      </Grid>
    )
  }

  handleImageChange(e) {
    this.setState({photo:e.target.files[0] });
    let reader = new FileReader();
    let file =e.target.files[0] ;
    reader.onloadend = () => {
      this.setState({file: file, imagePreviewUrl: reader.result });
    }
    reader.readAsDataURL(file)
  }
 handleSubmit(e){
  e.preventDefault();
  var files = new FormData($('#formulario')[0]);
  let name        = $("#nombre").val();
  let descripcion  = $("#descripcion").val();
 

  // inserta la informacion 
  axios.post('/x/v1/pru/prueba/'+name+'/'+descripcion, files )
  .then((response)=>{
   if (response.data.status=='SUCCESS') {
    this.setState({ exitoso: true })
   }else{
    this.setState({ fallo: true})
   }
  })
  .catch((response)=>{
      console.log(response)
  })

 }

 
} 


