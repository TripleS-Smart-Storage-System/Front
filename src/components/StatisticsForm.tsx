import axios from "axios";
import React from "react";
import config from "../config";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PencilFill } from "react-bootstrap-icons";
import { Supply, User, Warehouse, WarehouseData } from "../types";
import { deleteUser, getSupplies, getUsers, getWarehouses } from "../Utils/Api";
import Users from "../pages/Users";
import SupplyList from "./SupplyList";
import { AnyObject } from "immer/dist/internal";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useTranslation, WithTranslation, withTranslation } from 'react-i18next';

const data = [
  { address: "Address", numOrders: 0 },
];

class Statistics extends React.Component<{}, { users: User[]; supplies: Supply[]; warehouses: Warehouse[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: new Array<User>(),
      supplies: new Array<Supply>(),
      warehouses: new Array<Warehouse>(),
    };
  }

  async componentDidMount() {
    const users = await getUsers();
    const supplies = await getSupplies();
    const warehouses = await getWarehouses();
    console.log(users);
    this.setState({ users: users, supplies: supplies, warehouses: warehouses });
  }

  render() {
    const users = this.state.users;
    const supplies = this.state.supplies;
    const warehouses = this.state.warehouses;
    let s = "";
    let warehousesInfo = new Map<string, number>();
    for (let i = 0; i < supplies.length; ++i) {
      for (let j = 0; j < warehouses.length; ++j) {
        if (supplies[i].wareHouseId == warehouses[j].id) {
          if (!warehousesInfo.has(warehouses[j].address)) {
            warehousesInfo.set(warehouses[j].address, 0);
          }
          let adress = warehouses[j].address;
          let new_val = warehousesInfo.get(adress) || 0;
          warehousesInfo.set(warehouses[j].address, new_val + 1);
          break;
        }
      }
    }
    const numUsers = users.length;
    const obj = JSON.stringify(supplies, undefined, "\t");
    if (data.length == 1) {
    warehousesInfo.forEach(function (value, key) {
      s = s + " - " + key + ": " + value + "\n";
      data.push({address: key, numOrders: value});
    });
  }
    console.log(s);
    return (
      <div>
        <div>{supplies.length != 0 && <SaveSuppliesData text={s} />}</div>
        <div>
          {users.length != 0 && <PrintStats text={numUsers.toString()} />}
        </div>
      </div>
    );
  }
}

function getLink(list: string): string {
  const data = new Blob([list], { type: "text/plain" });
  const downloadLink = window.URL.createObjectURL(data);
  return downloadLink;
}

function PrintStats(props: { text: string }) {
  const { t } = useTranslation();
  return (
    <>
      <br></br>
      <h4>{t("Number of users:")}</h4>
      <div>
        <pre>{t("Total number of users:")} {props.text}</pre>
      </div>
    </>
  );
}

function SaveSuppliesData(props: { text: string }) {
  const { t } = useTranslation();
  return (
    <>
      <br></br>
      <div className="mh-10">
        <h4>{t("Total number of orders for all locations:")}</h4>
        <div className="mh-10">
          <pre>{props.text}</pre>
        </div>
        <LineChart width={800} height={300} data={data}>
          <Line type="monotone" dataKey="numOrders" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="address" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </>
  );
}

export default Statistics;
