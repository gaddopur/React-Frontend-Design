import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import {DISHES}  from '../shared/dishes'
import {COMMENTS}  from '../shared/comments'
import {LEADERS}  from '../shared/leaders'
import {PROMOTIONS}  from '../shared/promotions'

import Menu from './menucomponents'
import DishDetail from './dishdetailcomponents'
import Header from './headercomponent'
import Footer from './footercomponent'
import Home  from './homecomponent'
import ContactUs from "./contactuscomponent"
import About from "./aboutuscomponent"

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes : DISHES,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      comments: COMMENTS,
      dishId: null,
    }
  }
  render() {

    const HomePage = () => {
      return(
        <Home dish = {this.state.dishes.filter((dish) => dish.featured)[0]}
          leader = {this.state.leaders.filter((leader) => leader.featured)[0]}
          promotion = {this.state.promotions.filter((prom) => prom.featured)[0]} />
      );
    }

    const DishDetailPage = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) =>
             dish.id === parseInt(match.params.dishId, 10))[0]}
         comments={this.state.comments.filter((comment) =>
           comment.dishId === parseInt(match.params.dishId, 10))}
        />
      );
    }
    const AboutUsPage = () => {
      return (
        <About leaders={this.state.leaders}/>
      );
    }
    return(
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishDetailPage} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/aboutus" component={AboutUsPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
// <Menu dishes={DISHES} onClick={(id) => this.onDishSelect(id)} />
// <DishDetail dish = {DISHES.filter((dish) => dish.id === this.state.dishId)[0]} />

export default Main;
