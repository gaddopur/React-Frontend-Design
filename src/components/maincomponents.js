import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Menu from './menucomponents'
import DishDetail from './dishdetailcomponents'
import Header from './headercomponent'
import Footer from './footercomponent'
import Home  from './homecomponent'
import ContactUs from "./contactuscomponent"
import About from "./aboutuscomponent"


const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  render() {

    const HomePage = () => {
      return(
        <Home dish = {this.props.dishes.filter((dish) => dish.featured)[0]}
          leader = {this.props.leaders.filter((leader) => leader.featured)[0]}
          promotion = {this.props.promotions.filter((prom) => prom.featured)[0]} />
      );
    }

    const DishDetailPage = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.filter((dish) =>
             dish.id === parseInt(match.params.dishId, 10))[0]}
         comments={this.props.comments.filter((comment) =>
           comment.dishId === parseInt(match.params.dishId, 10))}
        />
      );
    }
    const AboutUsPage = () => {
      return (
        <About leaders={this.props.leaders}/>
      );
    }
    return(
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
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

export default withRouter(connect(mapStateToProps)(Main));
