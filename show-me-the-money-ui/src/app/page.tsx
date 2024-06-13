"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/1.0/balanceSheet").then((res) => {
      console.log(res.data.Reports);
      setData(res.data.Reports);
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col  justify-between p-24">
      {data.map((item: any, key) => {
        return (
          <div key={key}>
            {item.Rows.filter((i: any) =>  i.RowType != "Header").map(
              (row: any, key: number) => {
                const find: any = item.Rows.find(
                  (i: any) => i.RowType == "Header"
                );
                return (
                  <div key={key} className="relative mt-3 overflow-x-auto shadow-md sm:rounded-lg ">
                    <h4>{row.Title}</h4>
                    {row.Rows && row.Rows.length == 0 && (
                      <p className="no_data"> no data found</p>
                    )}
                    {row.Rows && row.Rows.length > 0 && <table className="w-full  text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                      {find && (
                        <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
                          <tr>
                            {find.Cells.map((cell: any, index: number) => {
                              return <th key={index}>{cell.Value}</th>;
                            })}
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {
                          row.Rows.map((r: any, index: number) => {
                            return (
                              <tr key={index} className="bg-blue-500 border-b border-blue-400">
                                {
                                   r.Cells.map((cell: any, index: number) => {
                                    return (
                                      <td key={index}>
                                        {cell.Value}
                                      </td>
                                    )
                                  })
                                }
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>}
                  </div>
                );
              }
            )}
          </div>
        );
      })}
    </main>
  );
}
