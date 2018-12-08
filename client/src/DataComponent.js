import React, { Component } from 'react';
import axios from 'axios';

class Data extends Component {

    componentDidMount() {
        this.main();
        console.log("componentWillMount");
       }

    state = {
        jdata: ""
    }

    main = async () => {
   
        let pred = document.getElementById("predictions");
        let data;

        const getData = async () => {
            try {
            const response = await axios.get('/data');
            data = response.data;
            this.setState({a:data});
            console.log("MONGODB:", JSON.stringify(response.data));

            } catch (error) {
            console.error(error);
            }
      }

      const getD = await getData()

    }


     CreateTableFromJSON = () => {

        const myData = this.state.a

        
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

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (let i = 0; i < myData.length; i++) {

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
    }


    render() {
        return (
        <div>
            <pre id="predictions"></pre>
            <input id = "btn_data" type="button" onClick={this.CreateTableFromJSON} value="Show data" /><br/>
            <p id="showData"></p>
        </div>
        )
    }
}

export default Data;