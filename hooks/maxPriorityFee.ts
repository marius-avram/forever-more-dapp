import axios from 'axios';

async function callRpc(method: string, params?: any) {
  var options = {
    method: "POST",
    url: "https://cors-anywhere.herokuapp.com/https://api.hyperspace.node.glif.io/rpc/v1",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
    data: {
      "jsonrpc": "2.0",
      "method": method,
      "id":1
    },
  };
  const res = await axios.request(options);
  return res.data.result;
}

export async function getMaxPriorityFee() {
  const priorityFee = await callRpc("eth_maxPriorityFeePerGas");
  return priorityFee;
}