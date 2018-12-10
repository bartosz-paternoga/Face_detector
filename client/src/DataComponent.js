import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
moment().format();

class Data extends Component {

    componentDidMount() {
        this.main();
        console.log("componentWillMount");
       }

    state = {
        a: "",
        counter: 10
    }

    main = async () => {
   
        let pred = document.getElementById("predictions");
        
        const getData = async () => {
            try {
            const response = await axios.get('/api/data');           
            this.setState({a:response.data});
            // console.log("MONGODB:", JSON.stringify(response.data));

            } catch (error) {
            console.error(error);
            }
      }

      const getD = await getData()

    }


     CreateTableFromJSON = () => {

        const myData = this.state.a
        let show = document.getElementById("show");
        show.innerHTML = "Click again 'Show data' to load more";
        
        // EXTRACT VALUE FOR HTML HEADER. 
        const col = [];
        for (let i = 0; i < myData.length; i++) {
            for (let key in myData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        const table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        let tr = table.insertRow(-1);                   // TABLE ROW.

        for (let i = 2; i < col.length-1; i++) {
            const th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        let counterBis;
        if(myData.length<10) {
            counterBis= myData.length;
        } else {
            counterBis = this.state.counter;
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (let i = 0; i < counterBis; i++) {
            console.log("this.state.counter0",this.state.counter)
            tr = table.insertRow(-1);

            for (let j = 2; j < col.length-1; j++) {
                const tabCell = tr.insertCell(-1);
                
                tabCell.innerHTML = myData[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        const divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        let c= this.state.counter;
       
        if ((this.state.a).length-this.state.counter>10) {
            c +=10;
            this.setState({counter:c});
        } else {
        
            this.setState({counter:(this.state.a).length});
        }



        // const startDate = document.getElementById("start").value;
        // console.log("startDate",startDate)
        // const end= document.getElementById("end").value;
        // const endD= moment(end).format("DD.MM.YYYY");
        // console.log("endDate2",endD)

    }


   
    render() {
        return (
        <div>
          <br/> <p id = "btn_data" type="submit"  onClick={this.CreateTableFromJSON} >Show data</p>
           {/* <br/> <input id = "btn_data" type="button" onClick={this.CreateTableFromJSON} value="Show data" /> */}
           
           {/* <label id ="lbl" htmlFor="start">Start date:</label>
           <input type="date" id="start" name="start" />
               
           <label id = "lbl" htmlFor="end">End date:</label>
           <input type="date"   id="end" name="end"    />  */}
                     
           <pre id="show"></pre>
           <pre id="predictions"></pre>
           <p id="showData"></p>      
        </div>
        )
    }
}

export default Data;
