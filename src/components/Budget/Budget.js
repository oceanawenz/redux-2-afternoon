import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { connect } from 'react-redux';
import { requestUserData } from '../../ducks/userReducer';
import { requestBudgetData, addPurchase, removePurchase} from '../../ducks/budgetReducer';


class Budget extends Component {

componentDidMount() {
  //after this.props.requestUserData runs, the http request should be sent for the user data. 
  //when the user data comes back, the redux store gets updated and will trigger a re-rending of the Budget component
  //this will now have values for email, firstName, and lastName on the props object
  this.props.requestUserData()
  this.props.requestBudgetData()
}

//All redux store state values managed by the budgetReducer are now on this.props, including the loading property in the redux store.
//Update this code to use the loading property from this.props.
render() {
    const { loading, purchases, budgetLimit } = this.props.budget
    //desctructure firstName and lastName off of this.props.user and pass as props to the Nav Component
    const {firstName, lastName } = this.props.user
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName = {firstName} lastName={lastName}/>
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase = {this.props.addPurchase}/>
              <DisplayPurchases purchases={purchases} removePurchase={this.props.removePurchase} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit}/>
              <Chart2 purchases={purchases}/>
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

//In the mapStateToProps function, return an object with a budget property 
//and value of the budget slice of state from the redux store.
function mapStateToProps(state) {
  return {
    budget: state.budget,
    //access the user data from the redux store
    user: state.user
  }
}


//Connect the Budget component
//the 2nd argument of the connect method is an object that you can put any needed action creators in. 
//invoke requestUserData that is now on this.props. also invoke it in the componentDidMount method.
export default connect (mapStateToProps, { requestUserData, requestBudgetData, addPurchase, removePurchase })(Budget);
