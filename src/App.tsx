import React from "react";
import { useState } from "react";
import "./App.css";
import { getInitialFlightData, IFlight } from "./DataProvider";
import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from "@tanstack/react-table";

const table = createTable().setRowType<IFlight>();

const defaultColumns = [
  table.createDataColumn("origin", {
    header: "Origin",
  }),
  table.createDataColumn("flight", {
    header: "Flight",
  }),
  table.createDataColumn("arrival", {
    header: "Arrival",
  }),
  table.createDataColumn("state", {
    header: "State",
  }),
];

function App() {
  const [data, setData] = React.useState(getInitialFlightData());
  const instance = useTableInstance(table, {
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  const eventSource = new EventSource("http://localhost:5000/events");

  const updateFlightState = (flightState: IFlight) => {
    const newData = data.map((item) => {
      if (item.flight == flightState.flight) {
        item.state = flightState.state;
      }
      return item;
    });
    setData(newData);
  };

  const removeFlight = (flightInfo: IFlight) => {
    const newData= data.filter(item => item.flight !== flightInfo.flight)
    setData(newData)
  }

  const stopUpdates = () => {
    eventSource.close()
  }

  React.useEffect(() => {
    const flightStateUpdateEventListener = (e: MessageEvent<any>) => {
      console.log('flightUpdateState', { e })
      updateFlightState(JSON.parse(e.data))
    }
    const flightRemoveEventListener = (e: MessageEvent<any>) => {
      console.log('flightRemove', { e })
      removeFlight(JSON.parse(e.data))
    }
    const closedConnectionEventListener = (e: MessageEvent<any>) => {
      console.log('closedConnection', { e })
      stopUpdates()
    }
    
    eventSource.addEventListener('flightStateUpdate', flightStateUpdateEventListener)
    eventSource.addEventListener('flightRemoval', flightRemoveEventListener)
    eventSource.addEventListener('closedConnection', closedConnectionEventListener)

    return () => {
      eventSource.removeEventListener('flightStateUpdate', flightStateUpdateEventListener, false)
      eventSource.removeEventListener('flightRemoval', flightRemoveEventListener, false)
      eventSource.removeEventListener('closedConnection', closedConnectionEventListener, false)
    }
  }, []);

  return (
    <>
      <table>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => { stopUpdates()}}>stop updates</button>
    </>
  );
}

export default App;
