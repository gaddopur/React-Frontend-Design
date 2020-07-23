import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { actions }  from 'react-redux-form'

import Menu from './menucomponents'
import DishDetail from './dishdetailcomponents'
import Header from './headercomponent'
import Footer from './footercomponent'
import Home  from './homecomponent'
import ContactUs from "./contactuscomponent"
import About from "./aboutuscomponent"
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from "../redux/actioncreators"


const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


const mapDispatchToProps = dispatch => ({
      postComment: (dishId, rating, author, comment) => dispatch(
        postComment(dishId, rating, author, comment)),
      fetchDishes: () => {dispatch(fetchDishes())},
      fetchComments: () => {dispatch(fetchComments())},
      fetchPromos: () => {dispatch(fetchPromos())},
      fetchLeaders: () => {dispatch(fetchLeaders())},
      postFeedback:(firstname, lastname, telnum, email, agree, contactType, message) =>
        dispatch(postFeedback(firstname, lastname,telnum, email, agree, contactType, message)),
      resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {
  // constructor(props){
  //   super(props);
      // fetchDishes();
  // }
  componentDidMount(){
    this.props.fetchPromos();
    this.props.fetchDishes();
    this.props.fetchLeaders();
    this.props.fetchComments();
  }
  render() {
    const HomePage = () => {
      return(
        <Home dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
          isErr={this.props.dishes.errMess}
          promotion={this.props.promotions.promos.filter((prom) => prom.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErr={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErr={this.props.leaders.errMess}
          />
      );
    }

    const DishDetailPage = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) =>
             dish.id === parseInt(match.params.dishId, 10))[0]}
         isLoading={this.props.dishes.isLoading}
         isErr={this.props.dishes.errMess}
         comments={this.props.comments.comments.filter((comment) =>
           comment.dishId === parseInt(match.params.dishId, 10))}
         commentErr={this.props.comments.errMess}
         postComment={this.props.postComment}
        />
      );
    }
    const AboutUsPage = () => {
      return (
        <About leaders={this.props.leaders}/>
      );
    }
    const ContactUsPage = () =>{
      return(
        <ContactUs resetFeedbackForm={this.props.resetFeedbackForm}
          postFeedback={this.props.postFeedback}/>
      );
    }
    return(
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishDetailPage} />
          <Route exact path="/contactus" component={ContactUsPage} />
          <Route exact path="/aboutus" component={AboutUsPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
