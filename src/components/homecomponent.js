import React from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg} from 'reactstrap'

import { Loading } from "./loadingcomponent"
import { baseUrl } from "../shared/baseurl"

function RenderCard({item, isErr, isLoading}) {
  if(isLoading) {
    return(
      <Loading />
    );
  }
  else if(isErr !== null){
    return(
      <div className="container">
         <div className="row">
           <h4>{isErr}</h4>
         </div>
       </div>
    );
  }
  return(
    <Card>
      <CardImg src={baseUrl+item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function Home(props) {
  return(
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
            <RenderCard item={props.dish}
              isLoading={props.isLoading}
              isErr={props.isErr} />
        </div>
        <div className="col-12 col-md m-1">
            <RenderCard item={props.promotion}
              isLoading={props.promoLoading}
              isErr={props.promoErr}/>
        </div>
        <div className="col-12 col-md m-1">
            <RenderCard item={props.leader}
              isLoading={props.leaderLoading}
              isErr={props.leaderErr}
              />
        </div>


      </div>
    </div>
  );
}

export default Home;
