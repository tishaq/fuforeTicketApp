import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Amplify from "aws-amplify";
import Async from "react-async";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import awsconfig from "./aws-exports";
import * as queries from "./graphql/queries";
import loading from "./loading.gif";
import errorImg from "./error.png";
import nodataImg from "./nodata.jpg";
import Header from "./Header";
import Footer from "./Footer";
Amplify.configure(awsconfig);

class App extends Component {
  state = {
    datetime: new Date()
  };
  render() {
    const getData = async ({ datetime }) => {
      let results = [];
      let error = {};
      let raw = {};
      let nextToken = null;
      //console.log(datetime);
      // grab all data that contains <date>
      const date =
        datetime.getFullYear() +
        "-" +
        (datetime.getMonth() < 10
          ? "0" + (datetime.getMonth() + 1)
          : datetime.getMonth() + 1) +
        "-" +
        (datetime.getDate() < 10
          ? "0" + datetime.getDate()
          : datetime.getDate());
      //console.log(date);
      do {
        raw = await API.graphql(
          graphqlOperation(queries.listTickets, {
            filter: { date: { beginsWith: date } },
            limit: 10000,
            nextToken: nextToken
          })
        );
        nextToken = raw.data.listTickets.nextToken;
        raw.data.listTickets.items.map(value => results.push(value));
      } while (nextToken);
      //console.log(results);
      return { results, error };
    };

    const parseData = data => {
      const d = {};
      data.forEach(element => {
        const device = element.deviceName;
        const type = element.receiptType;
        const item = element.itemType;
        if (!d[device]) {
          d[device] = {};
        }
        if (!d[device][type]) {
          d[device][type] = {};
        }
        if (!d[device][type][item]) {
          d[device][type][item] = [];
        }
        d[device][type][item].push(parseInt(element.fee));
      });
      let html = "";
      Object.entries(d)
        .sort()
        .forEach(e => {
          html += `
            <div class="row">
              <div class="col-lg-12">
                <div class="card shadow mb-4">
                  <div class="card-header bg-gradient-success d-sm-flex align-items-center justify-content-between mb-4">
                    <h5 class="h5 mb-0 font-weight-bold text-dark col-sm-4">
                      ${e[0]}
                    </h5>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table
                        class="table table-striped"
                        id="dataTable"
                        width="100%"
                        cellspacing="0"
                      >
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Quantity Type</th>
                            <th>Fee</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>`;
          Object.entries(e[1]).forEach(f => {
            html += `<tr><th>${f[0]}</th><th></th><th></th><th></th></tr>`;
            let subtotal = 0;
            Object.entries(f[1])
              .sort()
              .forEach(g => {
                const amount = g[1].reduce((acc, cur) => acc + cur);
                html += ` <tr>
                    <td>${g[0]}</td>
                    <td>${amount / g[1][0]}</td>
                    <td>${g[1][0].toLocaleString("en-US", {
                      style: "currency",
                      currency: "NGN"
                    })}</td>
                    <td>${amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "NGN"
                    })}</td>
                  </tr>`;
                subtotal += amount;
              });
            html += `
              <tr>
                <th>Sub-Total</th>
                <th></th>
                <th></th>
                <th>${subtotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN"
                })}</th>
              </tr>`;
          });
          html += `</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
        });
      return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
    };
    const handleChange = datetime => {
      this.setState({ datetime });
    };
    return (
      <div id="content">
        <Header />

        <Async promiseFn={getData} datetime={this.state.datetime}>
          {({ data, error, isPending }) => {
            if (isPending)
              return (
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-10">
                      <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">
                          Transactions Summary
                        </h1>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <Datepicker
                        selected={this.state.datetime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 img-center">
                      <img src={loading} alt="loading..." />
                      <br />
                      <p className="text-secondary">loading ...</p>
                    </div>
                  </div>
                </div>
              );
            if (error)
              return (
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">
                          Transactions Summary
                        </h1>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <h5>
                        Select Date {"  "}
                        <Datepicker
                          selected={this.state.datetime}
                          onChange={handleChange}
                        />
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 img-center">
                      <img src={errorImg} alt="Error..." />
                      <p className="text-danger">
                        {error[0] /*error.errors[0].message*/}
                      </p>
                    </div>
                  </div>
                </div>
              );
            if (data) {
              const result = parseData(data.results);
              if (result.props.dangerouslySetInnerHTML.__html !== "") {
                return (
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                          <h1 className="h3 mb-0 text-gray-800">
                            Transactions Summary
                          </h1>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <h5>
                          Select Date {"  "}
                          <Datepicker
                            selected={this.state.datetime}
                            onChange={handleChange}
                          />
                        </h5>
                      </div>
                    </div>
                    {result}
                  </div>
                );
              } else {
                return (
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                          <h1 className="h3 mb-0 text-gray-800">
                            Transactions Summary
                          </h1>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <h5>
                          Select Date {"  "}
                          <Datepicker
                            selected={this.state.datetime}
                            onChange={handleChange}
                          />
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 img-center">
                        <img src={nodataImg} alt="No Data..." />
                        <p className="text-warning">Try different date</p>
                      </div>
                    </div>
                  </div>
                );
              }
            }
          }}
        </Async>
        <Footer />
      </div>
    );
  }
}
export default App;
