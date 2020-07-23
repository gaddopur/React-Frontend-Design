import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalBody, ModalHeader, Button,
    Row, Label } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form'
import {Link} from 'react-router-dom'

import { Loading } from "./loadingcomponent"
import { baseUrl } from "../shared/baseurl"


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      isModalOpen:false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handelSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.name, values.comment)
    console.log("Comment is: " + JSON.stringify(values));
    alert('Comment is : ' + JSON.stringify(values));
  }

  render() {
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
          <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handelSubmit} className="m-2">
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" className="form-control" id="rating" name="rating">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name">Name</Label>
                <Control.text model=".name" className="form-control" id='name'
                  placeholder="Name" name="name"
                  validators={{
                      required, minLength: minLength(3), maxLength: maxLength(50)
                  }}>
                </Control.text>
                <Errors model=".name"
                  show="touched"
                  className="text-danger"
                  messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }}/>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea model=".comment" name="comment" id="comment"
                  placeholder="Write your comment hear" className="form-control"
                  rows="6">
                </Control.textarea>
              </Row>
              <Row className="form-group">
                <Button type="submit" color="primary">Submit</Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderDish({dish}) {
  return(
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}/>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComment({comments, postComment, dishId, commentErr}) {
  if(commentErr !== null){
    return(
       <div className="col-12 col-md-5 col-1">
         <h4>{commentErr}</h4>
       </div>
    );
  }
  const comment = comments.map((comment) => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>-- {comment.author} , {
               new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}
               ).format(new Date(Date.parse(comment.date)))
            }
       </p>
      </li>
    );
  });
  return (
    <div className="col-12 col-md-5 col-1">
      <ul className="list-unstyled">
        {comment}
        <li><CommentForm postComment={postComment} dishId={dishId}/></li>
      </ul>
    </div>
  );
}

const DishDetail = (props) => {
  if(props.isLoading) {
    return(
      <Loading />
    );
  }
  else if(props.isErr !== null){
    return(
      <div className="container">
         <div className="row">
           <h4>{props.errMess}</h4>
         </div>
       </div>
    );
  }
  else if(props.dish == null){
    return(
      <div></div>
    );
  }
  return(
    <div className='container'>
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComment comments={props.comments}
          commentErr={props.commentErr}
          postComment={props.postComment} dishId={props.dish.id}/>
      </div>
    </div>
  );
}

export default DishDetail
