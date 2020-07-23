import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

import { Loading } from "./loadingcomponent"
import { baseUrl } from "../shared/baseurl"

function RenderMenu({dish}) {
  return (
    <Card key={dish.id}>
      <Link to={`/menu/${dish.id}`} >
        <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}/>
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

const Menu = (props) => {
  if(props.dishes.isLoading) {
    return(
      <Loading />
    );
  }
  else if(props.dishes.errMess !== null){
    return(
      <div className="container">
         <div className="row">
           <h4>{props.dishes.errMess}</h4>
         </div>
       </div>
    );
  }
  const menu = props.dishes.dishes.map((dish) => {
    return(
      <div className="col-12 col-md-5 m-1">
          <RenderMenu dish={dish} />
      </div>
    );
  });
  return (
    <div className="container">
       <div className="row">
         <Breadcrumb>
           <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
           <BreadcrumbItem active>Menu</BreadcrumbItem>
         </Breadcrumb>
         <div className="col-12">
           <h3>Menu</h3>
           <hr />
         </div>
       </div>
      <div className="row">
        {menu}
      </div>
    </div>
  );
}

// class Menu extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const menu = this.props.dishes.map((dish) => {
//         return (
//           <div className="col-12 col-md-5 m-1">
//             <Card key={dish.id}
//               onClick={() => this.props.onClick(dish.id)}>
//               <CardImg width="100%" src={dish.image} alt={dish.name}/>
//               <CardImgOverlay>
//                 <CardTitle>{dish.name}</CardTitle>
//               </CardImgOverlay>
//             </Card>
//           </div>
//         );
//     });
//
//     return (
//       <div className="container">
//         <div className="row">
//           {menu}
//         </div>
//       </div>
//     );
//   }
// }

export default Menu;
