import '../login.css';
import React, {useState} from 'react';
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Button from '@material-ui/core/Button';
import PaymentIcon from '@material-ui/icons/Payment';

function Payment({Payment,error}) {

    const [details, setDetails] = useState({name:"", cardnum:"", month:1, year:2000, cvv2:null, address:"",isLoading:false});
    const history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
        let name = details.name
        let cardnum = details.cardnum
        let month = details.month
        let year = details.year
        let cvv2 = details.cvv2
        var obj = new Object()
        obj.userId = sessionStorage.getItem("userid")
        obj.name_surname = name
        obj.creditCartNum = cardnum
        obj.expiration_date_month = month
        obj.expiration_date_year = year
        obj.cvv2 = cvv2
        var jsonpayment = JSON.stringify(obj)
        setDetails({...details, isLoading:"true"})
        fetch('/payment/getpaymentfromuser' , {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: jsonpayment,
          }).then(response => {return response.json() }
          ).then(payment => {
            if(payment.message){
                
                  setDetails({...details, isLoading:"false"})
                  alert(payment.message)
                  window.location.reload();

              }
              else{
                  
              }
          });

          var addressJson = new Object();
          addressJson.userId = sessionStorage.getItem("userid")
          addressJson.address = details.address
          var jsonaddress = JSON.stringify(addressJson)
          fetch('/invoice/createinvoiceforuser' , {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: jsonaddress,
          }).then(response => {return response.json() }
          ).then(payment => {
              console.log(payment)
              if(payment.message){
                
                  setDetails({...details, isLoading:"false"})
                  alert(payment.message)
                  window.location.reload();

              }
              else{
                alert("Payment Successful!")
                setDetails({...details, isLoading:"false"})
                history.push("/")
              }
          });
       
    }

    if(details.isLoading)
    {
        return(<Loader 
            type="Puff"
            color="#00BFFF"
            height={800}
            width={1800}
            timeout={30000}/>)
    }

    else{

    return (
        <div className="App">  
   <form onSubmit = {submitHandler}>
        <div className = "form-inner">
            <h2  className = "loginNameClass">Please Enter Your Credit Card/Address Information</h2>
    {(error != "") ? (<div className= "error">{error}</div>) :""}
            <div className = "form-piece">
                <label htmlFor ="name_surname">Name of Credit Card Owner:</label>
                <input type = "text" name = "name_surname" id="name_surname" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
            </div>

            <div className = "form-piece">
                <label htmlFor ="cardnum">Card Number:</label>
                <input type = "number" name = "cardnum" id="cardnum" onChange={e => setDetails({...details, cardnum: e.target.value})} value={details.cardnum}/>
            </div>

            <div className = "form-piece">
                <label htmlFor ="month">Expiration Month:</label>
                <input type = "number" name = "month" id="month" onChange={e => setDetails({...details, month: e.target.value})} value={details.month}/>
            </div>

            <div className = "form-piece">
                <label htmlFor ="year">Expiration Year:</label>
                <input type = "number" name = "year" id="year" onChange={e => setDetails({...details, year: e.target.value})} value={details.year}/>
            </div>

            <div className = "form-piece">
                <label htmlFor ="cvv2">cvv2:</label>
                <input type = "number" name = "cvv2" id="cvv2" onChange={e => setDetails({...details, cvv2: e.target.value})} value={details.cvv2}/>
            </div>

            <div className = "form-piece">
                <label htmlFor ="address">Address:</label>
                <input type = "text" name = "address" id="address" onChange={e => setDetails({...details, address: e.target.value})} value={details.address}/>
            </div>
            <div className="buttonPos">
                <Button variant="contained" color="secondary" size="large" type = "submit" value ><PaymentIcon></PaymentIcon>Complete Payment</Button>
            </div>
        </div>
   </form>
   </div>
)
}
}

export default Payment;
